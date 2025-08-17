import socket

def get_device_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        s.connect(("8.8.8.8", 80))  # Connect to an external server (Google DNS)
        local_ip = s.getsockname()[0]  # Get the local device IP
    except Exception as e:
        local_ip = "Unable to determine IP"
    finally:
        s.close()
    
    return local_ip
