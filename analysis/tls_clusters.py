import json
from pathlib import Path
from collections import defaultdict


def load_tls_certs(path="data/tls_certs/tls_certs.json"):
    with open(path, "r") as f:
        return json.load(f)


def group_by_fingerprint(certs):
    clusters = defaultdict(list)
    for c in certs:
        clusters[c["fingerprint_sha256"]].append(c)
    return clusters


def group_by_issuer(certs):
    clusters = defaultdict(list)
    for c in certs:
        issuer = c["issuer_cn"] or "UNKNOWN_ISSUER"
        clusters[issuer].append(c)
    return clusters


def group_by_subject(certs):
    clusters = defaultdict(list)
    for c in certs:
        subject = c["subject_cn"] or "UNKNOWN_SUBJECT"
        clusters[subject].append(c)
    return clusters


def save_clusters_to_json(clusters, path):
    formatted = [
        {
            "key": key,
            "count": len(items),
            "hosts": [c["host"] for c in items],
            "ports": [c["port"] for c in items],
            "issuer": items[0].get("issuer_cn"),
            "subject": items[0].get("subject_cn"),
            "not_before": items[0].get("not_before"),
            "not_after": items[0].get("not_after"),
        }
        for key, items in clusters.items()
    ]

    with open(path, "w") as f:
        json.dump(formatted, f, indent=2)


def print_cluster_summary(title, clusters):
    print("\n===================================")
    print(f"      {title} CLUSTERS")
    print("===================================\n")

    sorted_clusters = sorted(clusters.items(), key=lambda x: len(x[1]), reverse=True)

    for key, items in sorted_clusters:
        if len(items) > 1:
            print(f"[+] Cluster '{key}' → {len(items)} servers")
            for c in items[:5]:
                print(f"    - {c['host']}:{c['port']}")
            print("")


def main():
    certs = load_tls_certs()

    print(f"[+] Loaded {len(certs)} certificates")

    # group by fingerprint, issuer, subject
    fp_clusters = group_by_fingerprint(certs)
    output_dir = Path("data/tls_clusters")
    output_dir.mkdir(parents=True, exist_ok=True)

    save_clusters_to_json(fp_clusters, output_dir / "tls_clusters_fingerprint.json")

    issuer_clusters = group_by_issuer(certs)
    save_clusters_to_json(issuer_clusters, output_dir / "tls_clusters_issuer.json")

    subject_clusters = group_by_subject(certs)
    save_clusters_to_json(subject_clusters, output_dir / "tls_clusters_subject.json")

    print_cluster_summary("FINGERPRINT", fp_clusters)
    print_cluster_summary("ISSUER", issuer_clusters)
    print_cluster_summary("SUBJECT", subject_clusters)

    biggest_fp = max(fp_clusters.items(), key=lambda x: len(x[1]))
    print("\n==============================")
    print("     BIGGEST TLS CLUSTER")
    print("==============================\n")
    print(f"Fingerprint: {biggest_fp[0]}")
    print(f"Servers: {len(biggest_fp[1])}\n")
    for c in biggest_fp[1][:20]:
        print(f" - {c['host']}:{c['port']}")

    print("\n[✓] TLS clustering complete.")
    print("[✓] Files created:")
    print(f"    - {output_dir / 'tls_clusters_fingerprint.json'}")
    print(f"    - {output_dir / 'tls_clusters_issuer.json'}")
    print(f"    - {output_dir / 'tls_clusters_issuer.csv'}")
    print(f"    - {output_dir / 'tls_clusters_subject.json'}")
    print(f"    - {output_dir / 'tls_clusters_subject.csv'}")


if __name__ == "__main__":
    main()