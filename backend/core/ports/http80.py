import socket
import os
import ssl
import requests
import subprocess
import hashlib
import re
import json
from bs4 import BeautifulSoup, Comment
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware


# Functions from the original script (with minimal changes for FastAPI)
def grab_banner_socket(ip, port=80, method="HEAD", http_ver="HTTP/1.1"):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(5)
    try:
        s.connect((ip, port))
        req = f"{method} / {http_ver}\r\nHost: {ip}:{port}\r\nConnection: close\r\n\r\n"
        s.sendall(req.encode())
        data = b""
        while True:
            chunk = s.recv(4096)
            if not chunk:
                break
            data += chunk
        return data.split(b"\r\n\r\n", 1)[0].decode(errors="ignore")
    except Exception as e:
        return f"Socket banner error: {e}"
    finally:
        s.close()

def run_whatweb(ip, port=80):
    try:
        result = subprocess.run(["whatweb", f"http://{ip}:{port}"], capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        return f"WhatWeb failed: {e}"

def run_http_methods(ip, port=80):
    result = {}
    for method in ["GET", "HEAD", "OPTIONS", "TRACE", "PUT", "DELETE", "CONNECT", "PATCH"]:
        try:
            response = requests.request(method, f"http://{ip}:{port}/", timeout=4)
            result[method] = response.status_code
        except Exception as e:
            result[method] = "Error"
    return result

def check_security_headers(headers):
    result = {}
    headers_to_check = [
        "Content-Security-Policy",
        "Strict-Transport-Security",
        "X-Frame-Options",
        "X-XSS-Protection",
        "X-Content-Type-Options",
        "Referrer-Policy",
        "Permissions-Policy",
        "Access-Control-Allow-Origin"
    ]
    for header in headers_to_check:
        result[header] = headers.get(header, 'Not Present')
    return result

def analyze_http(ip, port=80):
    url = f"http://{ip}:{port}/"
    try:
        response = requests.get(url, timeout=6, allow_redirects=True)
    except Exception as e:
        return {"error": str(e)}

    result = {
        "url": response.url,
        "status_code": response.status_code,
        "headers": response.headers,
    }

    soup = BeautifulSoup(response.text, "html.parser")
    title = soup.title.text.strip() if soup.title else "Not Found"
    meta_tags = {meta.get("name", ""): meta.get("content", "") for meta in soup.find_all("meta") if meta.get("name")}
    comments = [str(c).strip() for c in soup.find_all(string=lambda x: isinstance(x, Comment))]

    result["html_analysis"] = {
        "title": title,
        "meta_tags": meta_tags if meta_tags else 'None Found',
        "html_comments": len(comments),
        "sample_comments": comments[:5] if comments else [],
    }

    if re.search(r'Index of /', response.text, re.IGNORECASE):
        result["open_directory_listing"] = True
    else:
        result["open_directory_listing"] = False

    try:
        favicon_response = requests.get(f"{url}favicon.ico", timeout=3)
        if favicon_response.status_code == 200:
            favicon_hash = hashlib.md5(favicon_response.content).hexdigest()
            result["favicon_md5"] = favicon_hash
        else:
            result["favicon_status"] = "Not Found"
    except:
        result["favicon_status"] = "Error"

    result["cookies"] = response.cookies

    result["security_headers"] = check_security_headers(response.headers)
    result["http_methods"] = run_http_methods(ip, port)
    result["whatweb"] = run_whatweb(ip, port)

    result["socket_banner_head"] = grab_banner_socket(ip, port, "HEAD")
    result["socket_banner_get"] = grab_banner_socket(ip, port, "GET")

    return result



def try_login_on_multiple_endpoints(ip, port=80):
    url_base = f"http://{ip}:{port}"
    # List of common login URLs to test
    endpoints = ["/login", "/admin", "/signin", "/auth", "/user/login"]
    
    # Load credentials from the assets folder
    credentials_file_path = os.path.join(os.getcwd(), "assets", "credentials.json")
    try:
        with open(credentials_file_path, "r") as file:
            credentials = json.load(file)
    except Exception as e:
        print(f"Error loading credentials file: {e}")
        return False

    print(f"\nScanning for login on multiple endpoints...")

    # Try different endpoints with the credentials from the json file
    for endpoint in endpoints:
        print(f"\nTrying login at {url_base}{endpoint}")

        for entry in credentials:
            username = entry["username"]
            password = entry["password"]
            
            # Assume the form fields are 'username' and 'password'
            login_data = {
                "username": username,
                "password": password
            }

            # Send a POST request with the username and password
            try:
                response = requests.post(f"{url_base}{endpoint}", data=login_data, timeout=5, allow_redirects=False)
                
                # Check if login is successful (you can customize this check based on the target website's response)
                if "Welcome" in response.text or "Dashboard" in response.text:
                    print(f"Login successful with {username} / {password} at {url_base}{endpoint}")
                    print(f"Port {port} is vulnerable to login bypass.")
                    return True
                else:
                    print(f"Failed login attempt with {username} / {password} at {url_base}{endpoint}")
            except requests.RequestException as e:
                print(f"Request failed for {username} / {password}: {e}")

    print("No successful login attempts. Port is not vulnerable.")
    return False