import asyncio
import json
import ssl
import time
from typing import Dict, List


class ElectrumValidator:

    def __init__(self, timeout: int = 4, max_concurrent: int = 200):
        self.timeout = timeout
        self.sem = asyncio.Semaphore(max_concurrent)


    async def electrum_request(self, host: str, port: int):
        async with self.sem:
            ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            ctx.set_ciphers("DEFAULT:@SECLEVEL=1")

            start = time.time()

            try:
                reader, writer = await asyncio.wait_for(
                    asyncio.open_connection(
                        host,
                        port,
                        ssl=ctx,
                        server_hostname=host
                    ),
                    timeout=self.timeout
                )
                protocol = "ssl"

            except Exception:
                try:
                    reader, writer = await asyncio.wait_for(
                        asyncio.open_connection(host, 50001),
                        timeout=self.timeout
                    )
                    protocol = "tcp"
                except Exception:
                    return None


            # electrum handshake, mimic a real electrum client
            try:
                req_version = {
                    "id": 1,
                    "method": "server.version",
                    "params": ["Electrum 4.4.5", "1.4"]
                }

                writer.write((json.dumps(req_version) + "\n").encode())
                await writer.drain()

                raw = await asyncio.wait_for(reader.readline(), timeout=self.timeout)
                version_response = raw.decode().strip()
                req_banner = {"id": 2, "method": "server.banner", "params": []}

                writer.write((json.dumps(req_banner) + "\n").encode())
                await writer.drain()

                raw = await asyncio.wait_for(reader.readline(), timeout=self.timeout)
                banner_response = raw.decode().strip()

                writer.close()
                await writer.wait_closed()

                latency = round((time.time() - start) * 1000, 2)

                return {
                    "host": host,
                    "port": port,
                    "protocol": protocol,
                    "latency_ms": latency,
                    "version_raw": version_response,
                    "banner_raw": banner_response
                }

            except Exception:
                return None


    async def validate_all(self, peers: List[Dict]):
        tasks = []

        for p in peers:
            host = p["host"]
            port = p["ssl"] if p["ssl"] else (p["tcp"] or 50001)
            tasks.append(self.electrum_request(host, port))

        results = await asyncio.gather(*tasks)

        return [r for r in results if r]


async def main():
    with open("peers.json", "r") as f:
        peers = json.load(f)

    validator = ElectrumValidator()

    print(f"[+] Validating {len(peers)} peers...\n")

    results = await validator.validate_all(peers)

    with open("online_peers.json", "w") as f:
        json.dump(results, f, indent=2)


    print("\n==============================")
    print("      VALIDATION RESULTS")
    print("==============================\n")
    print(f"[✓] Peers online: {len(results)}")
    print(f"[✓] Output saved to online_peers.json\n")


if __name__ == "__main__":
    asyncio.run(main())