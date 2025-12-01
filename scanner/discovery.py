import asyncio
import ssl
import json
from typing import List, Dict, Optional
from collections import deque


class ElectrumDiscovery:
    """
    Electrum network discovery module.
    Connects to Electrum SSL servers, requests peer lists,
    falls back to TCP if SSL fails, and recursively crawls the network.
    """

    def __init__(
        self,
        timeout: int = 3,
        max_concurrent: int = 200,
        max_depth: int = 2
    ):
        self.timeout = timeout
        self.max_concurrent = max_concurrent
        self.max_depth = max_depth

        self.seen_hosts = set()
        self.discovered_peers = []

        self.sem = asyncio.Semaphore(max_concurrent)

    # ------------------------------------------------------------------
    # CONNECT AND REQUEST PEERS
    # ------------------------------------------------------------------

    async def connect_and_request(self, host: str, port: int = 50002):
        """
        Connect to an Electrum server via SSL. If SSL fails, fallback to TCP.
        Then send server.peers.subscribe and return parsed JSON response.
        """

        async with self.sem:
            print(f"\n[+] Connecting to {host}:{port}")

            # SSL CONTEXT (very permissive to avoid handshake failures)
            ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            ctx.set_ciphers("DEFAULT:@SECLEVEL=1")

            # -----------------------------------------
            # TRY SSL FIRST
            # -----------------------------------------
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

                # -----------------------------------------
                # FALLBACK TO TCP
                # -----------------------------------------
                try:
                    reader, writer = await asyncio.wait_for(
                        asyncio.open_connection(host, 50001),
                        timeout=self.timeout
                    )
                    print(f"[✓] TCP connection succeeded: {host}:50001")
                except Exception as tcp_error:
                    print(f"[✗] TCP also failed: {host} ({tcp_error})")
                    return None

            # -----------------------------------------
            # SEND REQUEST
            # -----------------------------------------
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

                # Some servers send multiple lines → take only first JSON
                response = raw.decode().strip()

                if not response:
                    print("[!] Empty response received")
                    return None

                data = json.loads(response)
                return data.get("result")

            except Exception as e:
                print(f"[!] Error during communication with {host}: {e}")
                return None

    # ------------------------------------------------------------------
    # PARSE PEERS
    # ------------------------------------------------------------------

    def parse_peers(self, raw_peers: List) -> List[Dict]:
        """
        Parses the returned Electrum peers into a clean structure.
        """
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
                    # SSL 50002 by default
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

    # ------------------------------------------------------------------
    # CRAWLER
    # ------------------------------------------------------------------

    async def crawl_network(
        self,
        seed_host: str = "electrum.blockstream.info",
        seed_port: int = 50002
    ) -> List[Dict]:
        """
        Electrum network recursive discovery crawler.
        """

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
                if p["ssl"]:  # always crawl SSL nodes first
                    queue.append((p["host"], p["ssl"], depth + 1))

        return self.discovered_peers


# ----------------------------------------------------------------------
# COMMAND-LINE EXECUTION
# ----------------------------------------------------------------------

async def main():
    crawler = ElectrumDiscovery(max_depth=4)
    results = await crawler.crawl_network(
        seed_host="electrum3.bluewallet.io",
        seed_port=50002
    )

    # Save JSON
    with open("peers.json", "w") as f:
        json.dump(results, f, indent=2)

    print("\n==========================")
    print("   DISCOVERED PEERS")
    print("==========================\n")

    print(f"Total peers: {len(results)}")


if __name__ == "__main__":
    asyncio.run(main())