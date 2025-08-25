import requests
import json
import urllib3
import socket
import ssl
from datetime import datetime, timezone
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.x509.oid import NameOID

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def get_ssl_certificate_info(ip, port):
    try:
        context = ssl._create_unverified_context()
        with socket.create_connection((ip, port), timeout=3) as sock:
            with context.wrap_socket(sock, server_hostname=ip) as ssock:
                der_cert = ssock.getpeercert(binary_form=True)
                cert = x509.load_der_x509_certificate(der_cert, default_backend())

                ssl_version = ssock.version()
                valid_from = cert.not_valid_before.replace(tzinfo=None)
                valid_until = cert.not_valid_after.replace(tzinfo=None)
                now = datetime.now(timezone.utc).replace(tzinfo=None)
                days_remaining = (valid_until - now).days

                subject = cert.subject
                issuer = cert.issuer

                def get_attr(name):
                    try:
                        return subject.get_attributes_for_oid(name)[0].value
                    except IndexError:
                        return "N/A"

                def get_issuer_attr(name):
                    try:
                        return issuer.get_attributes_for_oid(name)[0].value
                    except IndexError:
                        return "N/A"

                print("\nSSL Certificate Details")
                print("------------------------")
                print(f"SSL Version           : {ssl_version}")
                print(f"Signature Algorithm   : {cert.signature_hash_algorithm.name}")
                print(f"Common Name (CN)      : {get_attr(NameOID.COMMON_NAME)}")
                print(f"Organization (O)      : {get_attr(NameOID.ORGANIZATION_NAME)}")
                print(f"Org Unit (OU)         : {get_attr(NameOID.ORGANIZATIONAL_UNIT_NAME)}")
                print(f"Country (C)           : {get_attr(NameOID.COUNTRY_NAME)}")
                print(f"Email Address         : {get_attr(NameOID.EMAIL_ADDRESS)}")
                print(f"Issuer CN             : {get_issuer_attr(NameOID.COMMON_NAME)}")
                print(f"Valid From            : {valid_from}")
                print(f"Valid Until           : {valid_until}")
                print(f"Certificate Valid     : {'Yes' if days_remaining > 0 else 'No'} (Expires in {days_remaining} days)")
                print(f"Self-Signed           : {'Yes' if subject == issuer else 'No'}")
                return True
    except Exception as e:
        print("Error fetching SSL details: " + str(e))
        return False

def is_https_port_open(ip, port=443):
    try:
        context = ssl._create_unverified_context()
        with socket.create_connection((ip, port), timeout=2) as sock:
            with context.wrap_socket(sock, server_hostname=ip) as ssock:
                print("HTTPS port is open and responding")
                return True
    except Exception as e:
        print("HTTPS port check failed: " + str(e))
        return False

def check_https_vulnerability(ip, port):
    if not is_https_port_open(ip, port):
        print("Port is not open or does not support HTTPS")
        return False

    get_ssl_certificate_info(ip, port)

    url = f"https://{ip}:{port}/"

    try:
        with open("credentials.json", "r") as file:
            credentials = json.load(file)
    except Exception as e:
        print("Error loading credentials file: " + str(e))
        return False

    print(f"\nScanning {url} for HTTPS login vulnerabilities...")

    for entry in credentials:
        username = entry["username"]
        password = entry["password"]

        try:
            response = requests.post(
                url,
                data={"username": username, "password": password},
                timeout=3,
                verify=False
            )

            if any(k in response.text.lower() for k in ["logout"]):
                print(f"Access granted with {username} / {password}")
                print("HTTPS is vulnerable.")
                return True

        except Exception as e:
            print(f"Connection error for {username}: {str(e)}")
            break

    print("HTTPS is not vulnerable")
    return False

if __name__ == "__main__":
    target_ip = input("Enter target IP: ").strip()
    target_port = input("Enter port (default 443): ").strip()
    port = int(target_port) if target_port else 443
    check_https_vulnerability(target_ip, port)
