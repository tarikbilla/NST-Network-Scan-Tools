from fastapi import APIRouter
from typing import List
import socket
from core.device.getMacAddress import get_mac
from core.ip.getPorts import scan_ports
from core.ip.getDeviceType import *
from core.ip.getOS import *

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
    

@router.get("/os/{ipaddress}")
def get_os_address(ipaddress: str):
    try:
        device_os = get_os(ipaddress)
        return {"ip_address": ipaddress, "os": device_os}
    except Exception as e:
        return {"error": str(e)}



@router.get("/devicetype/{ipaddress}")
def get_devicetype(ipaddress: str):
    try:
        return identify_device(ipaddress)
    except Exception as e:
        return {"ip": ipaddress, "error": str(e)}
      

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
