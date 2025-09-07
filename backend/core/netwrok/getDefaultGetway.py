import os


def get_gateway_ip():
    # Use the system command to fetch the default gateway
    response = os.popen("ip route | grep default").read()
    gateway_ip = response.split()[2]  # Extract the gateway IP address
    return gateway_ip


