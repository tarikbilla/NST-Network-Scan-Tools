from typing import List
import socket

def get_service(port: int) -> str:
    """Returns the service name for a given port number."""
    try:
        return socket.getservbyport(port, 'tcp')
    except:
        return 'Unknown Port'

def scan_ports(target_ip: str) -> List[dict]:
    """Scans ports on the given target IP and returns open ports with services."""
    open_ports = []
    
    for port in range(1, 65536):  # Scanning all ports from 1 to 65535
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.01)  # Set timeout for each port scan attempt
            result = sock.connect_ex((target_ip, port))
            
            if result == 0:  # Port is open
                service = get_service(port)
                open_ports.append({"port": port, "state": "open", "service": service})
            sock.close()
        except:
            pass
    
    return open_ports