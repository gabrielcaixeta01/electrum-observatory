# Electrum Network Topology  
**Electrum Observatory — Structural Overview**

This document defines how the Electrum network is structured, how servers interoperate, and what aspects we study from a topology perspective.

---

## 1. Electrum Network Structure

Unlike Bitcoin Core:
- Electrum servers do **not** form a P2P mesh.
- Each client connects to servers in a **client → server** model.

Servers:
- run independently
- are not required to peer with each other
- serve client requests over TCP/SSL
- maintain a local full node backend

---

## 2. Server Components

An Electrum server typically contains:
- Bitcoin full node  
- ElectrumX / Electrs / ElectrumServer backend  
- network interface for client connections  

---

## 3. Public Topology Characteristics

Key properties:
- No global peer graph  
- Servers listed on centralized lists  
- No cryptographic trust model  
- Clients often “stick” to one server  
- Anyone can launch a server immediately  

---

## 4. Topology Metrics Measured

### **4.1 Server Count & Reachability**
- number of reachable TCP servers  
- number of reachable SSL servers  

---

### **4.2 Geographic Distribution**
- GeoIP lookup  
- per-country server density  
- ISP/ASN breakdown  

---

### **4.3 Infrastructure Concentration**
- percentage of servers in cloud providers  
- clustering by hosting provider  
- operator-based grouping inferred via certificates  

---

### **4.4 Software Diversity**
- versions of ElectrumX  
- versions of electrs  
- modified server variants  
- non-standard implementations  

---

### **4.5 Latency Graph**
Latency behavior used to infer:
- geographic proximity  
- cluster grouping  
- possible load balancers  

---

## 5. Topology Risks

- high concentration in major cloud hosts  
- little transparency about operators  
- lack of cryptographic authentication  
- lack of DHT or peer verification  
- single server compromise affects many users  

---

End of network topology.