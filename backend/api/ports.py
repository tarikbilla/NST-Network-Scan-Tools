from fastapi import APIRouter
from core.ports.http80 import analyze_http, try_login_on_multiple_endpoints
from core.ports.ftp21 import *



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
def get_http_port_data(ipaddress: str):
    try:
        ftp_details = check_ftp_vulnerability(ipaddress)
        return {"ftp_details": ftp_details}
    except Exception as e:
        return {"error": str(e)}
    
