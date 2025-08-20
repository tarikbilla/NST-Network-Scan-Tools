from fastapi import APIRouter
from typing import List
import socket
from core.device.getMacAddress import get_mac
from core.ip.getPorts import scan_ports

router = APIRouter()

@router.get("/")
def get_msg():
    return {"message": "Welcome to IP Route"}



@router.get("/mac/{ipaddress}")
def get_mac_address(ipaddress: str):
    try:
        mac_address = get_mac(ipaddress)
        return {"ip_address": ipaddress, "mac_address": mac_address}
    except Exception as e:
        return {"error": str(e)}
      

@router.get("/ports/{ip_address}", response_model=List[dict])
async def get_open_ports(ip_address: str):
    """Endpoint to scan ports for a given IP address."""
    try:
        open_ports = scan_ports(ip_address)
        if not open_ports:
            raise HTTPException(status_code=404, detail="No open ports found.")
        return open_ports
    except socket.gaierror:
        raise HTTPException(status_code=400, detail="Invalid IP address format.")
