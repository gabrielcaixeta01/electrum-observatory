# implementação mínima do protocolo Electrum via JSON-RPC TCP/SSL
# envia comandos como server.version, blockchain.scripthash.get_balance, etc.
# comportamento assíncrono (asyncio)

import ssl
import json
import asyncio

class ElectrumClient:
    """
    Minimal Electrum protocol client using asyncio.

    Supports:
    - server.version
    - blockchain.scripthash.get_balance
    - blockchain.scripthash.get_history
    """

    def __init__(self, host, port, use_ssl=True):
        self.host = host
        self.port = port
        self.use_ssl = use_ssl
        self.reader = None
        self.writer = None

    async def connect(self):
        ssl_context = ssl.create_default_context() if self.use_ssl else None
        self.reader, self.writer = await asyncio.open_connection(
            self.host, self.port, ssl=ssl_context
        )

    async def close(self):
        if self.writer:
            self.writer.close()
            await self.writer.wait_closed()

    async def rpc(self, method, params=None):
        """Send a JSON-RPC request."""
        if params is None:
            params = []

        msg = json.dumps({
            "id": 0,
            "method": method,
            "params": params
        }) + "\n"

        self.writer.write(msg.encode())
        await self.writer.drain()

        raw = await self.reader.readline()
        return json.loads(raw.decode())

    async def get_server_version(self):
        return await self.rpc("server.version", ["Electrum Observatory", "1.4"])