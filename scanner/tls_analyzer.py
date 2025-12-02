import asyncio
import ssl
import json
import hashlib
from typing import List, Dict, Optional
from datetime import datetime


class TLSAnalyzer:
    def __init__(self, timeout: int = 5, max_concurrent: int = 100):
        self.timeout = timeout
        self.sem = asyncio.Semaphore(max_concurrent)

   
    def _get_common_name(self, name) -> Optional[str]:
        if not name:
            return None
        
        try:
            for rdn in name:      
                for attr in rdn:
                    if attr[0].lower() == "commonname":
                        return attr[1]
                    
        except Exception:
            return None
        return None

   
    async def fetch_cert(self, host: str, port: int) -> Optional[Dict]:
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
                print(f"[!] TLS connect failed: {host}:{port} ({e})")
                return None

            try:
                ssl_obj = writer.get_extra_info("ssl_object")
                if ssl_obj is None:
                    writer.close()
                    await writer.wait_closed()
                    return None

                cert_info = ssl_obj.getpeercert()

                cert_bin = ssl_obj.getpeercert(binary_form=True)

                fingerprint_sha256 = hashlib.sha256(cert_bin).hexdigest()

                subject_cn = self._get_common_name(cert_info.get("subject"))
                issuer_cn = self._get_common_name(cert_info.get("issuer"))

                not_before = cert_info.get("notBefore")
                not_after = cert_info.get("notAfter")

                def parse_cert_time(t):
                    if not t:
                        return None

                    try:
                        dt = datetime.strptime(t, "%b %d %H:%M:%S %Y %Z")
                        return dt.isoformat()
                    except Exception:
                        return t

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

   
    async def analyze_all(self, peers: List[Dict]) -> List[Dict]:
        tasks = []
        for p in peers:
            host = p["host"]
            port = p["port"]

            if port != 50002 and p.get("protocol") != "ssl":
                continue

            tasks.append(self.fetch_cert(host, port))

        results = await asyncio.gather(*tasks)
        return [r for r in results if r]



async def main():
    with open("online_peers.json", "r") as f:
        peers = json.load(f)

    analyzer = TLSAnalyzer()
    print(f"[+] Running TLS analysis on {len(peers)} online peers...")

    results = await analyzer.analyze_all(peers)

    with open("tls_certs.json", "w") as f:
        json.dump(results, f, indent=2)

    print("\n==============================")
    print("      TLS ANALYSIS DONE")
    print("==============================\n")
    print(f"[✓] Certificates collected: {len(results)}")
    print("[✓] Files saved: tls_certs.json\n")


if __name__ == "__main__":
    asyncio.run(main())