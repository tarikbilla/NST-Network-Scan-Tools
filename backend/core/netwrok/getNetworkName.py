import os
import platform
import subprocess

def get_connected_network_name():
    system_platform = platform.system().lower()

    if system_platform == "linux":
        try:
            # Get active connections (both Wi-Fi & Wired)
            result = subprocess.check_output(
                ["nmcli", "-t", "-f", "NAME,TYPE,STATE", "con", "show", "--active"],
                stderr=subprocess.DEVNULL
            ).decode().strip()

            if not result:
                return "Not connected to any network"

            # Example output:
            # "MyWiFi:802-11-wireless:activated"
            # "Wired connection 1:802-3-ethernet:activated"
            for line in result.splitlines():
                name, ctype, state = line.split(":")
                if state == "activated":
                    if ctype == "802-11-wireless":
                        return f"{name}"
                    elif ctype == "802-3-ethernet":
                        return f"{name}"
            return "Not connected to any network"
        except Exception as e:
            return f"Error retrieving network name: {e}"

    elif system_platform == "windows":
        try:
            # PowerShell query for active network
            cmd = 'powershell "Get-NetConnectionProfile | Where-Object { $_.IPv4Connectivity -ne \'Disconnected\' } | Select-Object Name,NetworkCategory"'
            result = os.popen(cmd).read().strip()

            if not result:
                return "Not connected to any network"

            # Check if Wi-Fi or Ethernet by interface query
            iface_cmd = 'powershell "Get-NetAdapter | Where-Object { $_.Status -eq \'Up\' } | Select-Object -ExpandProperty InterfaceDescription"'
            iface_result = os.popen(iface_cmd).read().lower()

            if "wi-fi" in iface_result or "wireless" in iface_result:
                return f"{result.splitlines()[3].strip()}"  # extract Name
            else:
                return f"{result.splitlines()[3].strip()}"
        except Exception as e:
            return f"Error retrieving network name: {e}"

    elif system_platform == "darwin":  # macOS
        try:
            # Check Wi-Fi
            wifi_name = os.popen("/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk '/ SSID/ {print $2}'").read().strip()
            if wifi_name:
                return f"{wifi_name}"

            # Else check LAN
            lan_name = os.popen("networksetup -listallhardwareports | awk '/Device/ {print $2}' | head -n 1").read().strip()
            return f"{lan_name}" if lan_name else "Not connected to any network"
        except Exception as e:
            return f"Error retrieving network name: {e}"

    else:
        return "Unsupported OS for network name retrieval"


if __name__ == "__main__":
    print(get_connected_network_name())
