from fastapi import APIRouter
import os
from typing import List
from core.netwrok.getDefaultGetway import get_gateway_ip
from core.netwrok.getDeviceLocalIpAddress import get_device_local_ip
from core.netwrok.getNetworkName import get_connected_network_name
from core.netwrok.getAllIP import scan_network


router = APIRouter()

# get Detault Gateway IP
@router.get("/gateway")
def get_gateway():
    # Fetch the default gateway IP
    gateway_ip = get_gateway_ip()
    return {"gateway_ip": gateway_ip}

@router.get("/deviceip")
def get_local_ip_address():
    local_ip = get_device_local_ip()
    return {"device_local_ip": local_ip}

@router.get("/name")
def get_device_hostname():
    # Retrieve the device's hostname (device name)
    device_name = get_connected_network_name()
    return {"network_name": device_name}


# Combined endpoint to show all information
@router.get("/")
def get_network_info():
    # Fetch all network information
    gateway_ip = get_gateway_ip()
    local_ip = get_device_local_ip()
    network_name = get_connected_network_name()
    
    # Return everything in one response
    return {
        "gateway_ip": gateway_ip,
        "device_local_ip": local_ip,
        "network_name": network_name
    }


@router.get("/allip")
def get_connected_ips():
    gateway_ip = get_gateway_ip()  # Fetch the gateway IP
    network_ip = f"{gateway_ip}/24"  # Assuming /24 subnet mask for local network
    ips = scan_network(network_ip)  # Call the scan_network function to get all connected IPs
    return ips