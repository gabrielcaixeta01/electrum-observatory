import asyncio
import ssl
import json
import csv
from typing import List, Dict, Optional
from datetime import datetime


class TLSAnalyzer:
    def __init__(self, timeout: int = 5, max_concurrent: int = 100):
        self.timeout = timeout
        self.sem = asyncio.Semaphore(max_concurrent)

    # ----------------------------------------------------------------------
    # AUX: extract CN from subject/issuer
    # ----------------------------------------------------------------------
    def _get_common_name(self, name) -> Optional[str]:
        """
        Extracts commonName (CN) from subject/issuer structure returned by getpeercert().
        name is typically a tuple of tuples like:
        ( (("commonName", "example.com"),), (("organizationName", "Example"),), ...)
        """
        if not name:
            return None
        try:
            for rdn in name:          # each RDN
                for attr in rdn:      # each attribute in RDN
                    if attr[0].lower() == "commonname":
                        return attr[1]
        except Exception:
            return None
        return None

    # ----------------------------------------------------------------------
    # FETCH CERTIFICATE FOR ONE HOST
    # ----------------------------------------------------------------------
    async def fetch_cert(self, host: str, port: int) -> Optional[Dict]:
        """
        Opens an SSL connection to host:port, fetches the TLS certificate,
        and returns a dict with fingerprint and metadata.
        """
        async with self.sem:
            ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            ctx.set_ciphers("DEFAULT:@SECLEVEL=1")

            try:
                reader, writer = await asyncio.wait_for(
                    asyncio.open_connection(
                        host,
                        port,
                        ssl=ctx,
                        server_hostname=host,
                    ),
                    timeout=self.timeout,
                )
            except Exception as e:
                # Failed to connect via SSL → no cert
                # print(f"[!] TLS connect failed: {host}:{port} ({e})")
                return None

            try:
                ssl_obj = writer.get_extra_info("ssl_object")
                if ssl_obj is None:
                    writer.close()
                    await writer.wait_closed()
                    return None

                # Dict form
                cert_info = ssl_obj.getpeercert()

                # Binary form for fingerprint
                cert_bin = ssl_obj.getpeercert(binary_form=True)
                import hashlib

                fingerprint_sha256 = hashlib.sha256(cert_bin).hexdigest()

                subject_cn = self._get_common_name(cert_info.get("subject"))
                issuer_cn = self._get_common_name(cert_info.get("issuer"))

                not_before = cert_info.get("notBefore")
                not_after = cert_info.get("notAfter")

                # Normalizar datas para ISO, se possível
                def parse_cert_time(t):
                    if not t:
                        return None
                    # Formato típico: 'Aug 15 12:00:00 2025 GMT'
                    try:
                        dt = datetime.strptime(t, "%b %d %H:%M:%S %Y %Z")
                        return dt.isoformat()
                    except Exception:
                        return t  # se não conseguir parsear, devolve cru

                not_before_iso = parse_cert_time(not_before)
                not_after_iso = parse_cert_time(not_after)

                writer.close()
                await writer.wait_closed()

                return {
                    "host": host,
                    "port": port,
                    "fingerprint_sha256": fingerprint_sha256,
                    "subject_cn": subject_cn,
                    "issuer_cn": issuer_cn,
                    "not_before": not_before_iso,
                    "not_after": not_after_iso,
                }

            except Exception:
                writer.close()
                await writer.wait_closed()
                return None

    # ----------------------------------------------------------------------
    # PROCESS ALL PEERS
    # ----------------------------------------------------------------------
    async def analyze_all(self, peers: List[Dict]) -> List[Dict]:
        """
        peers: list from online_peers.json (each has host, port, protocol, latency_ms...)
        Only SSL-capable peers (port 50002 or protocol == 'ssl') will likely succeed.
        """
        tasks = []
        for p in peers:
            host = p["host"]
            port = p["port"]

            # Heurística: tentar TLS principalmente nos que usam 50002
            if port != 50002 and p.get("protocol") != "ssl":
                # você pode pular ou tentar assim mesmo, mas geralmente não vale:
                continue

            tasks.append(self.fetch_cert(host, port))

        results = await asyncio.gather(*tasks)
        return [r for r in results if r]


# ----------------------------------------------------------------------
# MAIN
# ----------------------------------------------------------------------
async def main():
    # Carrega os peers já validados (online_peers.json do validator.py)
    with open("online_peers.json", "r") as f:
        peers = json.load(f)

    analyzer = TLSAnalyzer()
    print(f"[+] Running TLS analysis on {len(peers)} online peers...")

    results = await analyzer.analyze_all(peers)

    # Salva em JSON
    with open("tls_certs.json", "w") as f:
        json.dump(results, f, indent=2)

    # Salva em CSV
    if results:
        with open("tls_certs.csv", "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(
                [
                    "host",
                    "port",
                    "fingerprint_sha256",
                    "subject_cn",
                    "issuer_cn",
                    "not_before",
                    "not_after",
                ]
            )
            for r in results:
                writer.writerow(
                    [
                        r["host"],
                        r["port"],
                        r["fingerprint_sha256"],
                        r["subject_cn"],
                        r["issuer_cn"],
                        r["not_before"],
                        r["not_after"],
                    ]
                )

    print("\n==============================")
    print("      TLS ANALYSIS DONE")
    print("==============================\n")
    print(f"[✓] Certificates collected: {len(results)}")
    print("[✓] Files saved: tls_certs.json, tls_certs.csv\n")


if __name__ == "__main__":
    asyncio.run(main())