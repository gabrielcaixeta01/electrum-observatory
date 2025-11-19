# envia queries controladas para analisar comportamento
# dectecta: inconsistências, rate limits, timeouts, respostas diferentes para formatos diferentes e comportamento suspeito.

import asyncio
from .electrum_client import ElectrumClient

TEST_SCRIPTHASH = "0000000000000000000000000000000000000000000000000000000000000000"

async def fingerprint_server(ip, port=50002, use_ssl=True):
    """
    Sends a series of controlled Electrum queries to detect:
    - behavioral differences
    - response inconsistencies
    - rate limiting
    - malformed handling
    """

    results = {}
    client = ElectrumClient(ip, port, use_ssl)

    try:
        await client.connect()

        # Normal query
        results["version"] = await client.get_server_version()

        # Balance query
        results["balance"] = await client.rpc(
            "blockchain.scripthash.get_balance",
            [TEST_SCRIPTHASH]
        )

        # Malformed query
        try:
            malformed = await client.rpc("blockchain.address.get_balance", ["invalid!!!"])
            results["malformed_response"] = malformed
        except:
            results["malformed_response"] = "error"

        await client.close()

    except Exception as e:
        results["error"] = str(e)

    return results