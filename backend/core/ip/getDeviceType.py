import scapy.all as scapy
from scapy.all import Ether, ARP, srp  # type: ignore
import re
import os
import socket

OUI_FILE = os.path.join(os.path.dirname(__file__), "oui.txt")
_OUI_CACHE: dict[str, str] = {}


def _load_oui_data() -> dict[str, str]:
    """Load OUI vendor database from oui.txt (cached)."""
    global _OUI_CACHE
    if _OUI_CACHE:
        return _OUI_CACHE

    oui: dict[str, str] = {}
    if not os.path.exists(OUI_FILE):
        _OUI_CACHE = oui
        return oui

    with open(OUI_FILE, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            # Example: "00-1A-2B   (hex)   Vendor Name"
            m = re.match(r"^([0-9A-Fa-f\-:]{6,8})(?:\s+\(hex\))?\s+(.+)", line)
            if m:
                prefix = m.group(1).replace("-", ":").upper()
                vendor = m.group(2).strip()
                oui[prefix] = vendor

    _OUI_CACHE = oui
    return oui


def _active_arp(ip: str) -> str | None:
    
    """
    Sends an ARP request to the given IP and returns the MAC address.
    """
    arp_request = scapy.ARP(pdst=ip)  # Build ARP request for the given IP
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")  # Broadcast address
    answered_list = scapy.srp(broadcast/arp_request, timeout=1, verbose=False)[0]  # Send and receive ARP packets

    if answered_list:
        return answered_list[0][1].hwsrc  # Return the MAC address from the response
    else:
        return "MAC Address not found"  # If no response, return this


def _get_vendor(mac: str, oui: dict[str, str]) -> str:
    """Map MAC OUI prefix -> vendor."""
    prefix = ":".join(mac.split(":")[:3]).upper()
    return oui.get(prefix, "Unknown Vendor")


def _get_ttl(ip: str, port: int = 80, timeout: float = 2.0) -> int | None:
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


def _guess_type_from_vendor_ttl(vendor: str, ttl: int | None) -> str:
    """
    Heuristics using only vendor name and (optional) TTL.
    No port scanning to keep it fast/minimal for API.
    """
    v = vendor.lower()

    if any(x in v for x in ["hikvision", "axis", "dahua", "foscam", "amcrest", "zmodo"]):
        return "Camera"

    if any(x in v for x in ["samsung", "lg", "sony", "vizio", "tcl", "sharp", "panasonic"]):
        return "TV"

    if any(x in v for x in ["apple", "xiaomi", "huawei", "samsung", "motorola", "oneplus", "google"]):
        if ttl is not None and ttl <= 64:
            return "Mobile"
        return "Consumer Device"

    if "raspberry" in v:
        return "Raspberry Pi"

    if any(x in v for x in ["sonoff", "tp-link", "tplink", "kasa", "tuya"]):
        return "Smart Plug"

    if any(x in v for x in ["nest", "ecobee", "honeywell", "emerson"]):
        return "Smart Thermostat"

    if any(x in v for x in ["philips hue", "philips lighting", "lifx"]):
        return "Smart Lights"

    if any(x in v for x in ["ring", "arlo"]):
        return "Smart Security System"

    if ttl is not None:
        if ttl >= 120:
            return "Computer/Server"
        if ttl <= 64:
            return "Consumer/IoT"

    return "Unknown"


def identify_device(ip: str) -> dict:
    """
    API-facing helper: given an IP, return ONLY vendor and device_type.
    Structure is JSON-safe and minimal.
    """
    oui = _load_oui_data()
    if not oui:
        return {
            "ip": ip,
            "error": "OUI database not found or empty. Place 'oui.txt' next to the app.",
        }

    mac = _active_arp(ip)
    if not mac:
        return {"ip": ip, "error": "MAC address not found (ARP failed)"}

    vendor = _get_vendor(mac, oui)
    ttl = _get_ttl(ip)

    device_type = _guess_type_from_vendor_ttl(vendor, ttl)

    return {
        "ip": ip,
        "vendor": vendor,
        "device_type": device_type,
        "ttl": ttl,
    }
