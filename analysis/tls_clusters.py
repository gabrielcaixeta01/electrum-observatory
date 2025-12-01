import json
import csv
from collections import defaultdict


def load_tls_certs(path="tls_certs.json"):
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


def save_clusters_to_csv(clusters, path):
    with open(path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["key", "count", "sample_hosts"])

        for key, items in clusters.items():
            hosts = [c["host"] for c in items]
            writer.writerow([key, len(items), ";".join(hosts)])


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

    # Print clusters with size > 1
    for key, items in sorted_clusters:
        if len(items) > 1:
            print(f"[+] Cluster '{key}' → {len(items)} servers")
            for c in items[:5]:  # show only first 5 hosts for readability
                print(f"    - {c['host']}:{c['port']}")
            print("")


def main():
    certs = load_tls_certs()

    print(f"[+] Loaded {len(certs)} certificates")

    # GROUP BY FINGERPRINT
    fp_clusters = group_by_fingerprint(certs)
    save_clusters_to_json(fp_clusters, "tls_clusters_fingerprint.json")
    save_clusters_to_csv(fp_clusters, "tls_clusters_fingerprint.csv")

    # GROUP BY ISSUER
    issuer_clusters = group_by_issuer(certs)
    save_clusters_to_json(issuer_clusters, "tls_clusters_issuer.json")
    save_clusters_to_csv(issuer_clusters, "tls_clusters_issuer.csv")

    # GROUP BY SUBJECT
    subject_clusters = group_by_subject(certs)
    save_clusters_to_json(subject_clusters, "tls_clusters_subject.json")
    save_clusters_to_csv(subject_clusters, "tls_clusters_subject.csv")

    # PRINT SUMMARY
    print_cluster_summary("FINGERPRINT", fp_clusters)
    print_cluster_summary("ISSUER", issuer_clusters)
    print_cluster_summary("SUBJECT", subject_clusters)

    # TOP CLUSTER
    biggest_fp = max(fp_clusters.items(), key=lambda x: len(x[1]))
    print("\n==============================")
    print("     BIGGEST TLS CLUSTER")
    print("==============================\n")
    print(f"[🔥] Fingerprint: {biggest_fp[0]}")
    print(f"[🔥] Servers: {len(biggest_fp[1])}\n")
    for c in biggest_fp[1][:20]:
        print(f" - {c['host']}:{c['port']}")

    print("\n[✓] TLS clustering complete.")
    print("[✓] Files created:")
    print("    - tls_clusters_fingerprint.json")
    print("    - tls_clusters_fingerprint.csv")
    print("    - tls_clusters_issuer.json")
    print("    - tls_clusters_issuer.csv")
    print("    - tls_clusters_subject.json")
    print("    - tls_clusters_subject.csv")


if __name__ == "__main__":
    main()