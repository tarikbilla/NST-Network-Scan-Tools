import scapy.all as scapy

def get_mac(ip):
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
