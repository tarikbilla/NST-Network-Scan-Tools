# api/allip.py
from fastapi import APIRouter, HTTPException
from typing import List
import ipaddress
import netifaces
from scapy.all import ARP, Ether, srp  # scapy

router = APIRouter()

def _get_iface_info():
    # Get default gateway + interface
    gws = netifaces.gateways()
    default_v4 = gws.get('default', {}).get(netifaces.AF_INET)
    if not default_v4:
        raise RuntimeError("No IPv4 default gateway found.")
    gateway_ip, iface = default_v4

    # Get local IPv4 + netmask on that interface
    addrs = netifaces.ifaddresses(iface).get(netifaces.AF_INET, [])
    if not addrs:
        raise RuntimeError(f"No IPv4 address found on interface {iface}.")
    addr = addrs[0].get('addr')
    netmask = addrs[0].get('netmask')
    if not addr or not netmask:
        raise RuntimeError(f"Missing IPv4/netmask on interface {iface}.")

    network = ipaddress.IPv4Network(f"{addr}/{netmask}", strict=False)
    return gateway_ip, addr, network

def _arp_scan(network: ipaddress.IPv4Network) -> List[str]:
    # Broadcast ARP for the whole subnet (fast on LAN)
    answered, _ = srp(
        Ether(dst="ff:ff:ff:ff:ff:ff") / ARP(pdst=str(network)),
        timeout=1,
        verbose=False
    )
    ips = {rcv.psrc for _, rcv in answered}
    return sorted(ips)

@router.get("/", response_model=List[str])
def get_all_connected_ips():
    try:
        gateway_ip, my_ip, net = _get_iface_info()
        ips = _arp_scan(net)
        # Hide our own host & the gateway from the list (optional)
        return [ip for ip in ips if ip not in {gateway_ip, my_ip}]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
