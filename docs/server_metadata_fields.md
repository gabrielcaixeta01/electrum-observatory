# Server Metadata Fields  
**Electrum Observatory — Data Schema**

This document defines the fields collected from each Electrum server during scanning and fingerprinting.

---

## 1. Basic Metadata

| Field | Description |
|-------|-------------|
| `ip` | Server IP address |
| `port` | Port used (TCP or SSL) |
| `ssl` | True/False |
| `reachable` | Whether the connection succeeded |
| `latency_ms` | Round-trip time |

---

## 2. Protocol Metadata

| Field | Description |
|-------|-------------|
| `banner` | Reported server banner |
| `protocol_version` | Electrum protocol version |
| `server_version` | ElectrumX/Electrs version |

---

## 3. TLS Metadata

| Field | Description |
|-------|-------------|
| `certificate_sha256` | Fingerprint |
| `issuer` | Certificate issuer |
| `valid_from` | Certificate start |
| `valid_to` | Certificate expiration |
| `san_dns` | DNS names in certificate |

---

## 4. Behavioral Metadata

| Field | Description |
|-------|-------------|
| `balance_response` | Result of balance query |
| `history_response` | Result of history query |
| `rate_limit_triggered` | Whether rate limiting occurred |
| `malformed_response` | Response to malformed queries |
| `timing_variance` | Standard deviation of latency |
| `fingerprint_hash` | Behavioral hash of server behavior |

---

## 5. Geo & Infrastructure

| Field | Description |
|-------|-------------|
| `country` | GeoIP country |
| `city` | GeoIP city |
| `asn` | Autonomous System Number |
| `org` | Hosting provider / organization |
| `cloud_provider` | AWS / GCP / Hetzner / OVH / etc. |

---

## 6. Internal Flags

| Field | Description |
|-------|-------------|
| `honeypot_score` | Suspicion score |
| `cluster_id` | Cluster label |
| `notes` | Free-text notes |

---

End of metadata fields.