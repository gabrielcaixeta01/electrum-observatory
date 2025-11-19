# Threat Model  
**Electrum Observatory — Adversarial Analysis**

This document defines the adversaries, capabilities, and attack surface relevant to privacy risks in the Electrum server ecosystem.

---

## 1. Adversary Types

### **A. Blockchain Analytics Firms**
Organizations such as Chainalysis, Elliptic, TRM Labs.

**Motivation:**  
Deanonymize Bitcoin wallets and transaction flows.

---

### **B. Governments / Law Enforcement**
May deploy monitoring infrastructure.

**Motivation:**  
Track criminal activity, dissident movements, or financial flows.

---

### **C. Malicious Individuals**
Private actors running rogue Electrum servers.

**Motivation:**  
IP harvesting, phishing, behavior tracking, man-in-the-middle attacks.

---

### **D. Commercial/Corporate Entities**
Server operators collecting analytics for profit or research.

---

## 2. Adversary Capabilities

- Run many Electrum servers across multiple IP ranges.
- Collect:
  - IP addresses,
  - address queries,
  - xpub-derived scripthashes,
  - timing correlations.
- Perform active fingerprinting of wallets.
- Log all incoming traffic.
- Correlate requests across time and multiple nodes.
- Deploy modified Electrum server implementations.
- Reuse TLS certificates across clusters.

---

## 3. Assets at Risk

### **A. User Identity & IP**
Servers directly see client IP addresses.

### **B. Address Reuse Patterns**
Servers can infer behavioral habits.

### **C. xpub Leakage**
Allows reconstruction of wallet structure.

### **D. Timing Metadata**
Polling patterns can fingerprint specific wallets.

### **E. Software Fingerprints**
Different Electrum clients send slightly different requests.

---

## 4. Attack Surface

### **Information Disclosure**
- Address queries
- xpub queries  
- IP linkage  
- timing correlation  

### **Behavioral Correlation**
- Wallet polling behavior
- transaction broadcasts
- synchronization patterns

### **Server-side Logging**
Potentially indefinite logs.

---

## 5. Attacker Goals

- Deanonymize Electrum users.
- Build behavior profiles.
- Perform clustering of user identities.
- Identify high-value wallets.
- Trace cross-wallet activity.

---

## 6. Defensive Assumptions

- Users may not use Tor.
- Users often reuse servers for months/years.
- Xpub leaks are common.
- Many servers have no clear operator metadata.
- No strong privacy guarantees exist in the Electrum protocol.

---

## 7. Project Security Posture

The Electrum Observatory:
- does **not** deanonymize users
- performs only non-sensitive controlled queries  
- adheres to ethical, research-oriented behavior  
- evaluates risks, rather than exploiting them  

---

End of threat model.