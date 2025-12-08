import asyncio
import ssl
import json
import time
import hashlib
from pathlib import Path
from typing import Dict, List


class ElectrumFingerprint:

    def __init__(self, timeout: int = 4, max_concurrent: int = 200):
        self.timeout = timeout
        self.sem = asyncio.Semaphore(max_concurrent)

    async def electrum_call(self, host: str, port: int, method: str, params: List):
        async with self.sem:
            ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            ctx.set_ciphers("DEFAULT:@SECLEVEL=1")

            try:
                reader, writer = await asyncio.wait_for(
                    asyncio.open_connection(
                        host, port,
                        ssl=ctx,
                        server_hostname=host
                    ),
                    timeout=self.timeout
                )
                proto = "ssl"
            except:
                try:
                    reader, writer = await asyncio.wait_for(
                        asyncio.open_connection(host, 50001),
                        timeout=self.timeout
                    )
                    proto = "tcp"
                except:
                    return None, "connection_failed", None

            request = {
                "id": 0,
                "method": method,
                "params": params
            }

            start = time.time()
            try:
                writer.write((json.dumps(request) + "\n").encode())
                await writer.drain()

                raw = await asyncio.wait_for(reader.readline(), timeout=self.timeout)
                latency = (time.time() - start) * 1000

                writer.close()
                await writer.wait_closed()

                try:
                    response = json.loads(raw.decode().strip())
                except:
                    return None, "invalid_json", latency

                return response, "ok", latency

            except Exception as e:
                return None, str(e), None


    async def fingerprint_server(self, host: str, port: int):
        fp = {
            "host": host,
            "port": port,
            "protocol": None,
            "latency_version": None,
            "latency_banner": None,
            "latency_ping": None,
            "latency_history": None,
            "supports_p2pkh": False,
            "supports_p2wpkh": False,
            "supports_p2tr": False,
            "error_version": None,
            "error_banner": None,
            "error_ping": None,
            "error_history": None,
            "response_hash_version": None,
            "response_hash_banner": None,
            "response_hash_ping": None,
            "response_hash_history": None,
        }

        # Test 1 — server.version
        res, err, lat = await self.electrum_call(
            host, port, "server.version",
            ["Electrum 4.4.5", "1.4"]
        )
        fp["latency_version"] = lat
        fp["error_version"] = err
        fp["response_hash_version"] = hashlib.sha256(str(res).encode()).hexdigest() if res else None

        # Detect protocol
        fp["protocol"] = "ssl" if port == 50002 else "tcp"

        # Test 2 — server.banner
        res, err, lat = await self.electrum_call(host, port, "server.banner", [])
        fp["latency_banner"] = lat
        fp["error_banner"] = err
        fp["response_hash_banner"] = hashlib.sha256(str(res).encode()).hexdigest() if res else None

        # Test 3 — server.ping
        res, err, lat = await self.electrum_call(host, port, "server.ping", [])
        fp["latency_ping"] = lat
        fp["error_ping"] = err
        fp["response_hash_ping"] = hashlib.sha256(str(res).encode()).hexdigest() if res else None

        # Test 4 — blockchain.address.get_history (P2PKH)
        addr_p2pkh = "1BoatSLRHtKNngkdXEeobR76b53LETtpyT"
        res, err, lat = await self.electrum_call(
            host, port,
            "blockchain.address.get_history",
            [addr_p2pkh]
        )
        fp["latency_history"] = lat
        fp["error_history"] = err
        fp["supports_p2pkh"] = (err == "ok")
        fp["response_hash_history"] = hashlib.sha256(str(res).encode()).hexdigest() if res else None

        # TEST — P2WPKH / Bech32
        addr_p2wpkh = "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kg3g4ty"
        res, err, lat = await self.electrum_call(
            host, port,
            "blockchain.address.get_history",
            [addr_p2wpkh]
        )
        fp["supports_p2wpkh"] = (err == "ok")

        # TEST — Taproot
        addr_p2tr = "bc1p5cyxnuxmeuwuvkwfem96l0hax0u4qxgmfxj0gd0k9u3x3jz7xk7q4lk7t7"
        res, err, lat = await self.electrum_call(
            host, port,
            "blockchain.address.get_history",
            [addr_p2tr]
        )
        fp["supports_p2tr"] = (err == "ok")

        return fp


    async def fingerprint_all(self, peers: List[Dict]):
        tasks = []

        for p in peers:
            host = p["host"]
            port = p["port"]
            tasks.append(self.fingerprint_server(host, port))

        results = await asyncio.gather(*tasks)
        return results


async def main():
    with open("online_peers.json", "r") as f:
        peers = json.load(f)

    print(f"[+] Fingerprinting {len(peers)} servers...")

    fp = ElectrumFingerprint()
    results = await fp.fingerprint_all(peers)

    output_dir = Path("data/fingerprints")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "fingerprints.json"
    
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2)

    print("\n==============================")
    print("      FINGERPRINT DONE")
    print("==============================\n")
    print(f"[✓] Servers fingerprinted: {len(results)}")
    print(f"[✓] Files saved: {output_path}\n")


if __name__ == "__main__":
    asyncio.run(main())