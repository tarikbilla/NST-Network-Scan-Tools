# NST - Network Scan Tool

**NST (Network Scan Tool)** is a cross-platform, lightweight, and modular IoT audit and network vulnerability scanner. Designed for cybersecurity professionals and system administrators, NST helps identify network services, simulate vulnerabilities, and visualize results in real-time—all in a standalone and offline-capable desktop application.

---


## Advanced Network Discovery & Profiling

NST provides comprehensive insights into devices connected to your local network:

- 🧭 **Device Discovery**  
  Automatically detects all active devices on the network subnet.

- 🔢 **MAC Address Retrieval**  
  Extracts and displays the MAC address for each connected device.

- 🏷️ **Device Type Classification**  
  Identifies device categories such as routers, IoT devices, workstations, and phones.

- 🏭 **Vendor Detection**  
  Maps MAC address prefixes to known manufacturers using OUI databases.

- 💽 **OS Fingerprinting**  
  Estimates operating systems through TTL values, service banners, and response patterns.

- ⚙️ **Service Enumeration**  
  Scans for open ports and identifies running services like SSH, HTTP, FTP, and more.

- 🔐 **Basic Vulnerability Simulation**  
  Includes brute-force login attempts, SSL/TLS checks, and banner grabbing for weak configurations.

- 📊 **Interactive Visualization**  
  Real-time data representation of discovered devices, open services, and vulnerability findings.

- 💾 **Data Export**  
  Save detailed scan results in JSON or CSV format for further processing.
  
---

## Features

- **Modular Scanning Engine**  
  Supports common protocols: FTP, SFTP, SSH, Telnet, HTTP, HTTPS

- **Real-Time Feedback**  
  Live logs, scan results, and vulnerability alerts via WebSockets

- **User-Friendly Interface**  
  Clean, modern UI with support for both novice and expert users

- **Persistent Scan History**  
  Local scan history with export and analysis capabilities

- **Cross-Platform Deployment**  
  Native desktop support for Windows & Linux (Electron / Tauri)

---

## Technology Stack

| Layer       | Tech Used              |
|-------------|------------------------|
| **Frontend** | React + Tailwind CSS   |
| **Backend**  | FastAPI (Async)        |
| **Storage**  | SQLite (Lightweight DB)|
| **Packaging**| Electron or Tauri      |
| **Live Communication** | WebSockets  |

---

## Installation

### Prerequisites
- Node.js & npm
- Python 3.9+
- SQLite
- (Optional) Electron or Tauri for packaging

### Clone the Repository
```bash
git clone https://github.com/your-username/nst-network-scan-tool.git
cd project_directory
```
### install requirements

```bash
pip install -r requirements.txt
```

## Run Backend FastAPI
### Active venv
```bash
 python3 -m venv venv
 source venv/bin/activate
 ```

### Run FastAPI

```bash
uvicorn main:app --reload
```
or
```bash
python3 -m uvicorn main:app --reload

```

or 
```bash
sudo ./venv/bin/uvicorn main:app --reload
```


### Steps to Kill the Process:

Kill Process (if need)
Find and Kill the Process Using the Port
```bash
sudo lsof -i :8000
```
This will show you which process is using port 8000. Once you have the process ID (PID), you can kill it:
```bash
sudo kill -9 <PID>
```
Change the Port (if needed)
```bash
sudo ./venv/bin/uvicorn main:app --reload --port 8001
```

### APIs

#### All IP

- **/api/allip/**  
  Get all connected ip address

#### Network

- **/network/deviceip/**  
  Get device local ip address     
  *Status:* *✅ Done*

- **/network/gateway/**   
  Get device default gateway    
  *Status:* *✅ Done*

- **/network/name/**  
  Get device connected network name     
  *Status:* *✅ Done*

#### IP

- **/ip/mac/IP_ADDRESS**  
  Get mac address using IP address    
  *Status:* *✅ Done*

- **/ip/devicetype/IP_ADDRESS**  
  Get Device Type using IP address     
  *Status:* 

- **/ip/os/IP_ADDRESS**  
  Get OS using IP address   
  *Status:* *✅ Done*

- **/ip/firewall/IP_ADDRESS**  
  Get Firewall Status using IP address    
  *Status:* 

- **/ip/ports/IP_ADDRESS**  
  Get all open ports of an IP address     
  *Status:* *✅ Done*


#### Ports

- **/api/ports/http/IP_ADDRESS**  
  Get HTTP Port Details     
  *Status:* *✅ Done*

- **/api/ports/ftp/IP_ADDRESS**  
  Get FTP Port Details    
  *Status:* *✅ Done*

- **/api/ports/http/IP_ADDRESS**  
  Get HTTP Port Details     
  *Status:* *✅ Done*


- **/api/ports/sftp/IP_ADDRESS**  
  Get SFTP Port Details    
  *Status:* *✅ Done* 