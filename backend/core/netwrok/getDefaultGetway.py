import os
# response = os.popen("ip route").read()
# gateway_ip = response.split()[2]
# print(gateway_ip)

def get_gateway_ip():
    # Use the system command to fetch the default gateway
    response = os.popen("ip route | grep default").read()
    gateway_ip = response.split()[2]  # Extract the gateway IP address
    return gateway_ip


