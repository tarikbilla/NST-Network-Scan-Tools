import os
import socket


def getTTLData(ip: str, port: int = 80, timeout: float = 2.0) -> int | None:
    """
    Try to fetch the TTL (Time To Live) value from a given IP.
    Returns an integer TTL if successful, otherwise None.
    """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        sock.connect((ip, port))  # default to port 80 (HTTP)
        ttl = sock.getsockopt(socket.IPPROTO_IP, socket.IP_TTL)
        sock.close()
        return ttl
    except Exception:
        return None


def get_os(ip):
    ttl = getTTLData(ip)
    if ttl is None:
        return "Unable to get OS"
    elif ttl == 64:
        return "Likely Linux/Unix-based OS"
    elif ttl == 128:
        return "Likely Windows-based OS"
    elif ttl == 255:
        return "Cisco Routers/Solaris"
    else:
        return "Unknown OS"

