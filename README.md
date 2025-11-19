# Electrum Observatory  
**Measuring Privacy, Surveillance, and Honeypot Behavior in the Electrum P2P Network**

Electrum is one of the most widely used Bitcoin light wallets. Because it relies on remote servers instead of performing full validation, its trust model is fundamentally different from that of Bitcoin Core.  
This project empirically investigates whether the Electrum server ecosystem shows signs of **centralization**, **surveillance**, **fingerprinting**, or **honeypot-like behavior**.

The goal is to map the Electrum network, analyze server responses, detect suspicious patterns, and measure privacy risks affecting millions of users.

---

## Project Objectives

- Map the global Electrum server network.
- Collect metadata from every publicly reachable server.
- Perform controlled behavioral fingerprinting by sending structured queries.
- Analyze clustering patterns that may indicate:
  - shared operators,
  - modified server implementations,
  - potential honeypots.
- Measure privacy risks such as:
  - xpub/address leakage,
  - IP correlation,
  - timing correlation,
  - request fingerprinting.
- Produce a public report with results and recommendations.

---

## Why This Matters

Electrum servers can see:
- the addresses you check,
- the xpubs you query,
- your IP address,
- how often you poll the server,
- and which wallet software you use.

Anyone can run an Electrum server, including:
- blockchain surveillance firms,
- governments,
- malicious actors,
- or private companies.

This makes Electrum a realistic target for surveillance.  
**The Electrum Observatory seeks to measure how real that risk is.**

---

## Research Questions

1. **How centralized is the Electrum server network?**  
   Are a few operators running most servers?

2. **Do servers exhibit suspicious patterns?**  
   Fingerprinting, modified responses, unusual logging behavior, rate limits, etc.

3. **Do servers behave differently based on the client or query?**

4. **What metadata can Electrum servers infer or leak about users?**  
   (xpubs, address reuse, timing, IP correlation)

5. **Are there signs that analytics companies operate Electrum servers?**

---

## Methodology

### **1. Network Scan**
- Discover and connect to every publicly listed Electrum server.
- Collect metadata:
  - IP, port, uptime
  - software version
  - TLS certificate details
  - supported features
  - latency and response profiles

### **2. Behavioral Fingerprinting**
Send controlled queries:
- balance requests
- transaction history
- malformed queries
- P2PKH, P2WPKH, Taproot address formats
- xpub history requests

Record differences in:
- responses
- timing
- filtering behavior
- rate limiting
- error messages

### **3. Behavior Clustering**
Using machine learning (e.g., scikit-learn):
- identify clusters of servers with identical behavior,
- detect outliers,
- find signs of centralized server operators.

### **4. Honeypot Indicators**
Evaluate:
- TLS certificate reuse  
- identical server signatures across multiple IPs  
- abnormal logging behavior inferred indirectly  
- modified protocol responses  
- unusually perfect uptime  
- suspicious metadata correlation  

### **5. Final Output**
- Global Electrum network map
- Metadata tables
- Behavior fingerprints
- Honeypot suspicion report
- Privacy recommendations

---

## Threat Model

**Adversary:**  
Blockchain analytics companies, governments, surveillance contractors, malicious server operators.

**Capabilities:**
- Run multiple Electrum servers  
- Correlate IPs, timing, xpub queries  
- Fingerprint wallet implementations  
- Log and aggregate metadata  

---

## Tools & Dependencies

- Python 3.10+
- Async Electrum protocol scanner
- TLS certificate parser
- GeoIP lookup
- scikit-learn (clustering)
- pandas / numpy
- Jupyter notebooks
- matplotlib / seaborn (for visualizations)

A `requirements.txt` will be provided in the repository.

---

## License

MIT License — open for research, auditing, and transparency.

---

## Contributions

Pull requests are welcome — especially for:
- new scanning modules  
- dataset visualizations  
- behavioral metrics  
- tooling improvements  
- documentation  

---

## Ethical Notice

This project *does not* deanonymize real users.  
Only public servers are queried, and only with controlled non-sensitive requests.  
The purpose is transparency, not exploitation.

---