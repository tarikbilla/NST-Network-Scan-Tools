# api/ipRoute.py
from fastapi import APIRouter, HTTPException
from core.device.getMacAddress import get_mac

router = APIRouter()

@router.get("/mac/{ipaddress}")
def get_mac_address(ipaddress: str):
    mac = get_mac(ipaddress)
    if not mac:
        raise HTTPException(
            status_code=404,
            detail=f"No MAC found for {ipaddress}. Ensure it's on the same LAN and reachable."
        )
    return {"ip_address": ipaddress, "mac_address": mac}

@router.get("/")
def get_msg():
    return {"MSG": "Hello"}
