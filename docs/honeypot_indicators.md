# Honeypot Indicators

### **Electrum Observatory --- Suspicion & Adversary Behavior Framework**

This document details the heuristic indicators used to classify Electrum
servers as **potentially suspicious**, **modified**, or
**honeypot-like**.\
These are **signals**, not definitive proof --- a high score suggests
the server deserves deeper inspection.

------------------------------------------------------------------------

# 1. Certificate-Based Indicators

TLS certificates provide a cryptographic anchor to a server's identity.\
Because Electrum connections use SSL/TLS most of the time, the
certificate itself becomes a **fingerprint of ownership**.

------------------------------------------------------------------------

## **1.1 Certificate Reuse Across Many Hosts (Strong Indicator)**

Using **the same TLS certificate** across: - multiple IP addresses\
- different geographic regions\
- unrelated Autonomous Systems (ASNs)\
- cloud providers that normally issue unique certs

...is **unnatural** for independent community-run servers.

### **Why this is suspicious**

A TLS certificate is normally: - automatically issued per-domain (Let's
Encrypt)\
- tied to a specific hostname\
- unique per server instance\
- renewed every 90 days

So if dozens of servers use the **same certificate**, it means:

1.  They are all controlled by **one operator**.\
2.  They are deployed through automation (ansible, puppet, docker
    images).\
3.  They might be:
    -   a **monitoring farm**,\
    -   a **data collection cluster**,\
    -   or a **surveillance node** distributing many endpoints to widen
        coverage.

### **What this reveals**

Certificate reuse enables: - correlating user behavior across servers\
- IP-level tracking\
- poll frequency fingerprinting\
- xpub re-identification

This is one of the **strongest honeypot indicators**.

------------------------------------------------------------------------

## **1.2 Suspicious Issuer or Internal CA**

Indicators include: - certificates signed by enterprise appliance CAs
(e.g., Blue Coat, Palo Alto, Fortinet)\
- certificates with *uncommon internal* CA names\
- issuer fields consistent with corporate MITM interception

### **Why this matters**

Enterprises use internal CAs to intercept TLS traffic.\
If a public Electrum server presents such a certificate, the likelihood
of:

-   full traffic inspection\
-   payload logging\
-   identity correlation

...is significantly elevated.

------------------------------------------------------------------------

## **1.3 Long-Lifetime Certificates (\>10 years)**

Community servers typically use **short-lived certs** (90 days for LE).\
Certificates valid for **10, 20, 30+ years** are typical of:

-   self-signed certificates\
-   automated honeypots\
-   nodes designed to "set and forget"

### **Why this is important**

Long-lived certs prevent rotation, making it easier to maintain:

-   long-term tracking\
-   persistent fingerprinting\
-   longitudinal analysis on user behavior

------------------------------------------------------------------------

# 2. Behavioral Indicators

Behavior is often more revealing than certificates.\
A server modified for surveillance or fingerprinting will deviate from
ElectrumX/Fulcrum reference behavior.

------------------------------------------------------------------------

## **2.1 Modified or Inconsistent JSON Responses (High Indicator)**

Examples: - extra unexpected JSON fields\
- missing mandatory fields\
- malformed or non-standard ordering\
- inconsistent formatting between requests

### **Why this is suspicious**

Most Electrum servers run: - ElectrumX\
- Fulcrum\
- Electrs

All of them produce **stable, deterministic JSON structures**.

When a server returns: - different key ordering\
- modified data types\
- additional metadata\
- wrapped responses

...it strongly suggests: - a custom fork\
- an analytics proxy\
- a logging middleware\
- an in-path monitoring appliance

**JSON inconsistency is a high-value fingerprinting signal.**

------------------------------------------------------------------------

## **2.2 Timing Anomalies During Specific Queries**

Examples: - normal latency for P2PKH\
- **slow latency for xpub or history queries**\
- slowdowns triggered only for malformed or repeated requests

### **Why this matters**

This suggests:

-   backend logging based on query type\
-   additional processing triggered\
-   indexing or storage of specific wallet identifiers (xpubs)\
-   fingerprinting routines

Timing side-channels are highly diagnostic in protocol analysis.

------------------------------------------------------------------------

## **2.3 Selective Rate Limiting**

Triggering rate limits only when: - querying too many addresses\
- enumerating addresses\
- scanning sequential indexes\
- using unusual address formats (e.g., Taproot)

### **Why this is suspicious**

Legitimate servers rate limit uniformly.

Selective rate limiting is seen in: - analytics services\
- honeypots designed to detect scanners\
- servers distinguishing "wallet-like" from "crawler-like" traffic

------------------------------------------------------------------------

# 3. Infrastructure Indicators

These focus on deployment patterns.

------------------------------------------------------------------------

## **3.1 Perfect or Near-Perfect Uptime**

Community servers: - reboot\
- crash\
- lose SSL autoreload\
- fail to renew certificates

But surveillance-operated machines: - run on redundant architecture\
- have uptime \>99.99%\
- rarely reboot\
- have uniform response profiles

This is a common pattern in monitoring infrastructure.

------------------------------------------------------------------------

## **3.2 Concentration in ASNs or Hosting Providers**

Clusters of servers that share: - same ASN\
- same static hostname patterns\
- same VPS provider\
- same network block\
- same reverse DNS naming scheme

...likely belong to a **single coordinated operator**.

This is a hallmark of: - analytics firms\
- research institutions\
- corporate network mappers

------------------------------------------------------------------------

## **3.3 TOR Exit Node Hosting**

Servers hosted: - on TOR exits\
- without reverse DNS\
- with ephemeral IP lifetimes

are highly suspicious because:

-   anyone can deploy quickly\
-   used for hiding operator identity\
-   difficult to attribute\
-   perfect for monitoring open ecosystems

------------------------------------------------------------------------

# 4. Query Handling & Interactive Indicators

------------------------------------------------------------------------

## **4.1 Discriminatory Responses by Client Type**

If the server behaves differently depending on: - the Electrum version
you claim\
- the sequence of requests you send\
- whether you send real wallet patterns vs. scanning patterns

...it is attempting **active client fingerprinting**.

### Why this is a red flag

This is a known technique used by: - malware C2 servers\
- analytics systems\
- governmental interception nodes

Applying this to Electrum suggests intentional traffic classification.

------------------------------------------------------------------------

## **4.2 Address-Type Discrimination**

Servers that: - behave normally for P2PKH\
- fail or slow down only for P2WPKH or P2TR\
- reject Taproot unless client identifies itself

...might be logging or flagging newer address formats.

------------------------------------------------------------------------

## **4.3 Fingerprinting Behavior**

Examples: - varying timing to detect automation\
- returning subtly different error messages\
- checking sequence timing\
- identifying scanning loops

These are standard honeypot techniques used in: - Censys\
- Shodan\
- SSH honeypots\
- malware honeypots

Applying this to Electrum suggests intentional traffic classification.

------------------------------------------------------------------------

# 5. Combined Honeypot Suspicion Score (HSS)

Servers receive a cumulative score across four axes:

### **TLS Axis**

-   reused certificates\
-   self-signed certificate\
-   unusual issuer\
-   long-lived certificates

### **Behavior Axis**

-   timing anomalies\
-   JSON inconsistencies\
-   modified responses\
-   selective failures

### **Infrastructure Axis**

-   hosting clusters\
-   TOR exit node behavior\
-   perfect uptime patterns

### **Query-Handling Axis**

-   response differentiation\
-   fingerprinting patterns\
-   client-dependent logic

Each server receives:

    0–30 LOW RISK  
    31–69 MEDIUM RISK  
    70–100 HIGH RISK

"High Risk" servers are flagged for deeper forensic analysis.
