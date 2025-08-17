import socket

def get_device_name():
    # Get the device's hostname
    device_name = socket.gethostname()
    return device_name
