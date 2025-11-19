# coleta metadados estáticos
# salva em JSON

import time
import asyncio
from .electrum_client import ElectrumClient

async def scan_metadata(ip, port=50002, use_ssl=True):
    """
    Collects metadata from a single Electrum server:
    - banner / version
    - protocol
    - latency
    """

    start = time.time()
    client = ElectrumClient(ip, port, use_ssl)

    try:
        await client.connect()
        version_info = await client.get_server_version()
        latency = (time.time() - start) * 1000

        await client.close()

        return {
            "ip": ip,
            "port": port,
            "ssl": use_ssl,
            "latency_ms": latency,
            "server_version": version_info,
        }

    except Exception as e:
        return {
            "ip": ip,
            "error": str(e)
        }