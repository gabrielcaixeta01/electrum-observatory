import json

def load_fingerprints(path="fingerprints.json"):
    with open(path, "r") as f:
        return json.load(f)

def load_tls(path="tls_certs.json"):
    with open(path, "r") as f:
        return json.load(f)

def load_tls_clusters(path="tls_clusters_fingerprint.json"):
    with open(path, "r") as f:
        return json.load(f)


# honeypot scoring signals
def compute_tls_signals(tls_entry, tls_cluster_size):
    score = 0
    signals = []

    # 1. Certificate reused across many hosts
    if tls_cluster_size >= 5:
        score += min(tls_cluster_size * 2, 40)
        signals.append(f"reused_certificate_cluster_of_{tls_cluster_size}")

    # 2. Self-signed issuer
    issuer = tls_entry.get("issuer_cn", "")
    if issuer in [None, "", "UNKNOWN_ISSUER"]:
        score += 10
        signals.append("self_signed_or_unknown_issuer")

    # 3. Strange subject CN
    subject = tls_entry.get("subject_cn", "")
    if subject in ["localhost", "UNKNOWN_SUBJECT", None, ""]:
        score += 5
        signals.append("suspicious_subject_CN")

    # 4. Certificate validity anomalies
    not_after = tls_entry.get("not_after", "")
    if not_after and ("2035" in not_after or "2040" in not_after or "2050" in not_after):
        score += 15
        signals.append("very_long_certificate_validity")

    return score, signals


def compute_behavior_signals(fp_entry, cluster_map):
    score = 0
    signals = []

    # 1. Very fast responses (< 10ms)
    if fp_entry["latency_ping"] and fp_entry["latency_ping"] < 10:
        score += 10
        signals.append("suspicious_low_latency")

    # 2. Very slow responses (> 2000ms)
    if fp_entry["latency_ping"] and fp_entry["latency_ping"] > 2000:
        score += 10
        signals.append("suspicious_high_latency")

    # 3. Cannot respond to normal calls
    if fp_entry["error_history"] != "ok":
        score += 10
        signals.append("cannot_serve_history")

    # 4. Does not support P2WPKH or P2TR (modern servers should)
    if not fp_entry["supports_p2wpkh"]:
        score += 3
        signals.append("missing_p2wpkh_support")

    if not fp_entry["supports_p2tr"]:
        score += 3
        signals.append("missing_taproot_support")

    # 5. Behavioral cluster size from response hashes
    behavior_hash = fp_entry["response_hash_banner"]
    if behavior_hash in cluster_map:
        csize = len(cluster_map[behavior_hash])
        if csize >= 5:
            score += min(csize * 2, 30)
            signals.append(f"identical_behavior_cluster_{csize}")

    return score, signals



def main():
    print("[+] Loading data...")
    fingerprints = load_fingerprints()
    tls_entries = load_tls()
    tls_clusters = load_tls_clusters()

    tls_fps = {}
    for c in tls_clusters:
        tls_fps[c["key"]] = c["count"]

    behavior_clusters = {}
    for fp in fingerprints:
        banner_hash = fp["response_hash_banner"]
        if banner_hash not in behavior_clusters:
            behavior_clusters[banner_hash] = []
        behavior_clusters[banner_hash].append(fp)

    tls_by_host = {c["host"]: c for c in tls_entries}
    results = []

    print("[+] Computing scores for each server...")

    for fp in fingerprints:
        host = fp["host"]

        tls_info = tls_by_host.get(host)

        total_score = 0
        signals = []

        if tls_info:
            fp_sha = tls_info["fingerprint_sha256"]
            tls_cluster_size = tls_fps.get(fp_sha, 1)

            s, sig = compute_tls_signals(tls_info, tls_cluster_size)
            total_score += s
            signals.extend(sig)

        else:
            total_score += 20
            signals.append("no_tls_certificate_detected")

        bscore, bsig = compute_behavior_signals(fp, behavior_clusters)
        total_score += bscore
        signals.extend(bsig)

        final_score = min(total_score, 100)

        results.append({
            "host": host,
            "port": fp["port"],
            "honeypot_score": final_score,
            "risk_level": (
                "HIGH" if final_score >= 70 else
                "MEDIUM" if final_score >= 40 else
                "LOW"
            ),
            "signals": signals,
        })

    with open("honeypot_scores.json", "w") as f:
        json.dump(results, f, indent=2)


    print("\n==============================")
    print("       TOP SUSPECTED")
    print("==============================\n")

    results_sorted = sorted(results, key=lambda x: x["honeypot_score"], reverse=True)

    for r in results_sorted[:20]:
        print(f"{r['host']} → score {r['honeypot_score']} ({r['risk_level']})")
        for sig in r["signals"][:5]:
            print(f"   - {sig}")
        print("")

    print("[✓] Honeypot scoring complete.")
    print("[✓] Files written: honeypot_scores.json\n")


if __name__ == "__main__":
    main()