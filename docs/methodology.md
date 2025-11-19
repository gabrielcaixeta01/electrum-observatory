# Methodology  
**Electrum Observatory — Research and Measurement Framework**

This document describes the complete methodology used to study the Electrum P2P network, measure its decentralization, detect suspicious behavior, and identify possible surveillance or honeypot activity.

---

## 1. Overview

The methodology combines:
- active network scanning,
- metadata collection,
- behavioral fingerprinting,
- clustering and statistical analysis,
- and inference of potential surveillance patterns.

We *only* interact with publicly reachable Electrum servers.  
No sensitive user data is used, generated, or exposed.

---

## 2. Network Discovery

We gather the full list of reachable Electrum servers through:

1. Public server lists:
   - `servers.json` from Electrum
   - third-party curated lists
   - DNS seeds, when applicable

2. Active probing:
   - Attempt connection on known Electrum ports (TCP 50001, SSL 50002)
   - Test both TCP and SSL variants

For each server, we store:
- IP & port  
- protocol version  
- software (banner)  
- capabilities (features)  
- TLS details (issuer, fingerprint, expiration)  
- uptime and latency  

---

## 3. Metadata Scanning

Once a server is reachable, the scanner collects:

### **Server Attributes**
- banner/version  
- supported Electrum protocol level  
- pruning support  
- features (e.g., mempool, SSL-only, TOR availability)  

### **TLS Attributes**
- certificate issuer  
- validity dates  
- SHA1/SHA256 fingerprint  
- SAN extensions  
- certificate reuse across clusters  

### **Behavioral Attributes**
- handshake consistency  
- round-trip time  
- response codes  
- malformed request handling  

All metadata is timestamped.

---

## 4. Behavioral Fingerprinting

We send controlled queries to each server:

### **Standard Queries**
- `blockchain.address.get_balance`
- `blockchain.address.get_history`
- `blockchain.headers.subscribe`

### **Address Format Variation**
- P2PKH
- P2WPKH
- P2WSH
- Taproot (P2TR)

### **Non-standard or malformed queries**
- incorrect parameter count  
- malformed address strings  
- random method names  

### **xpub Tests**
- `blockchain.scripthash.get_history` using xpub-derived scripthashes  
- timing analysis for large query sets  

We measure:
- differences in answers  
- response stability  
- rate limiting  
- logging suspicion (inferred via timing variance)  

---

## 5. Data Normalization & Storage

All data is stored in:

data/raw/
.json
data/processed/
servers.csv
fingerprints.csv
tls.csv

Normalization steps include:
- deduplication  
- merging per-server files  
- canonicalizing TLS fields  
- computing behavioral hashes  

---

## 6. Clustering & Analysis

We use scikit-learn for clustering and anomaly detection.

### **Techniques**
- DBSCAN (detect identical behavior clusters)
- KMeans (categorize server types)
- PCA (reduce behavioral feature dimensionality)
- Hierarchical clustering (operator grouping)

### **Goals**
- identify servers operated by the same entity  
- detect modified Electrum implementations  
- find outliers with unusual or suspicious behavior  

---

## 7. Honeypot Indicators

We flag servers for further investigation when they exhibit:

- certificate reuse across unrelated IPs  
- unusually perfect uptime  
- abnormal latency stability  
- inconsistent or modified protocol responses  
- aggressive logging inference  
- selective rate limiting  
- suspiciously uniform behavioral patterns  

These signals are *indicators*, not proof.

---

## 8. Output & Reporting

Final deliverables:
- global map of Electrum servers  
- centralization metrics  
- behavioral clusters  
- honeypot suspicion ranking  
- privacy recommendations  

Reports are stored in:

docs/results_summary.md
data/reports/

---

## 9. Ethical Standards

- No user data is collected.  
- No deanonymization attempts are made.  
- Only public Electrum servers are queried.  
- All analysis aims to improve transparency and privacy.  

---

End of methodology.