import asyncio
import ssl
import json
from pathlib import Path
from typing import List, Dict
from collections import deque


class ElectrumDiscovery:

    def __init__(self, timeout: int = 4, max_concurrent: int = 200, max_depth: int = 2):
        self.timeout = timeout
        self.max_concurrent = max_concurrent
        self.max_depth = max_depth
        self.seen_hosts = set()
        self.discovered_peers = []
        self.sem = asyncio.Semaphore(max_concurrent)


    async def connect_and_request(self, host: str, port: int = 50002):
        async with self.sem:
            print(f"\n[+] Connecting to {host}:{port}")

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
                        server_hostname=host
                    ),
                    timeout=self.timeout
                )

                print(f"[✓] SSL connection succeeded: {host}")

            except Exception as ssl_error:
                print(f"[!] SSL failed on {host}:{port} ({ssl_error})")
                print("[*] Trying TCP fallback on port 50001...")

                try:
                    reader, writer = await asyncio.wait_for(
                        asyncio.open_connection(host, 50001),
                        timeout=self.timeout
                    )
                    print(f"[✓] TCP connection succeeded: {host}:50001")

                except Exception as tcp_error:
                    print(f"[✗] TCP also failed: {host} ({tcp_error})")
                    return None



            # SEND REQUEST
            try:
                request = {
                    "id": 0,
                    "method": "server.peers.subscribe",
                    "params": []
                }

                writer.write((json.dumps(request) + "\n").encode())
                await writer.drain()

                raw = await asyncio.wait_for(
                    reader.readline(),
                    timeout=self.timeout
                )

                writer.close()
                await writer.wait_closed()
                response = raw.decode().strip()

                if not response:
                    print("[!] Empty response received")
                    return None

                data = json.loads(response)
                return data.get("result")

            except Exception as e:
                print(f"[!] Error during communication with {host}: {e}")
                return None


    # PARSE PEERS
    def parse_peers(self, raw_peers: List) -> List[Dict]:
        parsed = []

        for entry in raw_peers:
            if len(entry) < 2:
                continue

            host = entry[0]
            features = entry[1]

            ssl_port = None
            tcp_port = None

            for f in features:
                if f.startswith("s"):
                    try:
                        ssl_port = int(f[1:])
                    except:
                        ssl_port = 50002

                elif f.startswith("t"):
                    tcp_port = 50001

            parsed.append({
                "host": host,
                "ssl": ssl_port,
                "tcp": tcp_port,
                "raw": entry
            })

        return parsed
    

    # electrum network recursive discovery crawler.
    async def crawl_network(self, seed_host: str = "electrum.blockstream.info", seed_port: int = 50002) -> List[Dict]:
        queue = deque([(seed_host, seed_port, 0)])

        while queue:
            host, port, depth = queue.popleft()

            if host in self.seen_hosts:
                continue

            if depth > self.max_depth:
                continue

            self.seen_hosts.add(host)

            raw = await self.connect_and_request(host, port)
            if raw is None:
                continue

            peers = self.parse_peers(raw)
            self.discovered_peers.extend(peers)

            for p in peers:
                if p["ssl"]:
                    queue.append((p["host"], p["ssl"], depth + 1))

        return self.discovered_peers



async def main():
    crawler = ElectrumDiscovery()
    results = await crawler.crawl_network(
        seed_host="electrum3.bluewallet.io",
        seed_port=50002
    )

    output_dir = Path("data/peers")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "peers.json"
    
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2)

    print("\n==========================")
    print("   DISCOVERED PEERS")
    print("==========================\n")

    print(f"Total peers: {len(results)}")
    print(f"Saved to: {output_path}")


if __name__ == "__main__":
    asyncio.run(main())