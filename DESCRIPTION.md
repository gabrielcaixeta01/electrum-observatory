# Is the electrum network just a honeypot for chainanalisys?


## What is Electrum?

Electrum is a lightweight Bitcoin wallet and client–server protocol that allows users to interact with the Bitcoin network without downloading or validating the entire blockchain.
It works by connecting to remote Electrum servers that index the blockchain and provide transaction and balance information to the wallet.

## How does it work?

Electrum uses a client-server model. The wallet does not scan or validade the blockchain itself; instead, it connects to Electrum servers. These servers run a full Bitcoin node and build additional indexes that map script-hashes to transactions history, UTXOs, and balances. When the wallet needs information, it queries the server through the Electrum protocol, receives the relevant blockchain data, and broadcasts transaction through the server.

## How can it be used to monitor network behavior?

Electrum servers receive queries from thousands of lightweight wallets. Each query exposes metadata that can be analyzed.
Because servers see which script-hashes are being checked, when they are checked, and from which IP addresses the requests come, operators can observe patterns of wallet activity across the network. By aggregating this data, an Electrum server can identify:

- usage patterns
- transaction propagation behavior
- anomalies
- balance changes

Although Electrum was not designed as a surveillance tool, its client–server architecture makes it possible for a server operator to gather significant insight into wallet activity and broader network behavior.

## Project Description

This project analyzes how Electrum may expose sensitive user information and how an Electrum server could be exploited as a honeypot. To investigate this, we deploy a configured Electrum server that logs connection metadata and address-query patterns, enabling an assessment of what information can be collected and how it may support chain analysis.

