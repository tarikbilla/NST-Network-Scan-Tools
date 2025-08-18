from fastapi import APIRouter
from core.device.getMacAddress import get_mac

router = APIRouter()

@router.get("/mac/{ipaddress}")
def get_mac_address(ipaddress: str):
    try:
        mac_address = get_mac(ipaddress)
        return {"ip_address": ipaddress, "mac_address": mac_address}
    except Exception as e:
        return {"error": str(e)}

@router.get("/")
def get_msg():
    return {"MSG": "Hello"}
