# Honeypot Indicators  
**Electrum Observatory — Suspicion Framework**

This document describes the criteria used to identify potentially suspicious or honeypot-like Electrum servers.

These are *indicators*, not proof.

---

## 1. Certificate-Based Indicators

### **1.1 Certificate Reuse**
Same TLS certificate used across:
- multiple IPs  
- multiple continents  
- unrelated ASNs  

Strong indicator of central operator.

---

### **1.2 Suspicious Issuer**
Certificates signed by:
- surveillance contractors  
- enterprise MITM appliances  
- uncommon internal CAs  

---

### **1.3 Long-lifetime Certificates**
> 10 years validity may indicate a set-and-forget honeypot.

---

## 2. Behavioral Indicators

### **2.1 Modified Protocol Responses**
Servers that deviate from Electrum reference behavior:
- unexpected fields  
- abnormal error messages  
- inconsistent JSON formatting  

---

### **2.2 Logging Inference**
Servers responding more slowly to:
- xpub queries  
- malformed requests  
- repeated queries  

This suggests internal processing or logging overhead.

---

### **2.3 Selective Rate Limiting**
Rate limits triggered only on:
- certain address formats  
- xpub-heavy clients  
- rapid repeated queries  

Suspiciously targeted.

---

## 3. Infrastructure Indicators

### **3.1 Perfect Uptime**
Servers online >99.99% for long periods may be cloud-managed monitoring nodes.

---

### **3.2 Hosting Clusters**
Many servers in:
- same ASN  
- same subnet  
- same provider  
running identical versions.

Possible monitoring farm.

---

### **3.3 TOR Exit Nodes**
Some honeypot operators hide behind Tor exit nodes.

---

## 4. Query Handling Indicators

### **4.1 Discriminatory Responses**
Different answers depending on:
- perceived wallet type  
- query sequence  
- malformed requests  

---

### **4.2 Fingerprinting Behavior**
Server attempts to:
- detect client implementation  
- measure polling patterns  
- differentiate real wallets from scanners  

---

## 5. Ranking System

Each server receives a cumulative **Honeypot Suspicion Score (HSS)** based on:
- TLS anomalies  
- behavioral anomalies  
- infrastructure anomalies  
- response pattern anomalies  

Servers with high HSS are flagged for deeper analysis.

---

End of honeypot indicators.