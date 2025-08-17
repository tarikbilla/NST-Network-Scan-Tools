import scapy.all as scapy

def get_mac(ip):
    # Send ARP request to get MAC address
    arp_request = scapy.ARP(pdst=ip)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")  # Ethernet broadcast frame
    answered_list = scapy.srp(broadcast/arp_request, timeout=1, verbose=False)[0]

    # If the response is received, return the MAC address
    if answered_list:
        return answered_list[0][1].hwsrc
    else:
        return "MAC Address not found"
