import os
import platform

def get_connected_network_name():
    system_platform = platform.system().lower()

    if system_platform == "linux":
        # For Linux systems (using nmcli)
        try:
            network_name = os.popen("nmcli -t -f ACTIVE,SSID dev wifi | grep ^yes | cut -d: -f2").read().strip()
            return network_name if network_name else "Not connected to any network"
        except Exception as e:
            return f"Error retrieving network name: {e}"

    elif system_platform == "windows":
        # For Windows systems (using netsh)
        try:
            network_name = os.popen("netsh wlan show interfaces | findstr \"SSID\"").read().split(":")[1].strip()
            return network_name if network_name else "Not connected to any network"
        except Exception as e:
            return f"Error retrieving network name: {e}"

    else:
        return "Unsupported OS for network name retrieval"
