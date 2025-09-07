from fastapi import APIRouter
from core.ports.http80 import analyze_http, try_login_on_multiple_endpoints
from core.ports.ftp21 import *
from core.ports.https443 import *
from core.ports.sftp22 import *



router = APIRouter()

# get http port details
@router.get("/http/{ipaddress}")
def get_http_port_data(ipaddress: str):
    try:
        http_details = analyze_http(ipaddress)
        http_bruteforce = try_login_on_multiple_endpoints(ipaddress)
        return {"http_details": http_details, "http_bruteforce": http_bruteforce}
    except Exception as e:
        return {"error": str(e)}
    
# get ftp port details
@router.get("/ftp/{ipaddress}")
def get_ftp_port_data(ipaddress: str):
    try:
        ftp_details = check_ftp_vulnerability(ipaddress)
        return {"ftp_details": ftp_details}
    except Exception as e:
        return {"error": str(e)}
    
    
# get 443 port details
@router.get("/https/{ipaddress}")
def get_https_port_data(ipaddress: str):
    try:
        https_details = get_ssl_certificate_info(ipaddress)
        return {"https_details": https_details}
    except Exception as e:
        return {"error": str(e)}
    
    
# get ftp port details
@router.get("/sftp/{ipaddress}")
def get_sftp_port_data(ipaddress: str):
    try:
        sftp_details = is_sftp_port_open(ipaddress)
        return {"sftp_details": sftp_details}
    except Exception as e:
        return {"error": str(e)}
