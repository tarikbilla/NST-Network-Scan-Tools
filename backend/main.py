from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import network
from api import ipRoute
from api import allip
from api import ports

app = FastAPI()

# Allow frontend (Vite dev server) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to NST"}

@app.get("/scan/ftp")
def scan_ftp(ip: str):
    return {"ip": ip, "result": "FTP scan completed (demo response)"}

# Include the gateway API route
app.include_router(allip.router, prefix="/api/allip", tags=["Network"])

app.include_router(network.router, prefix="/api/network", tags=["Network"])

app.include_router(ipRoute.router, prefix="/api/ip", tags=["ip"])

app.include_router(ports.router, prefix="/api/ports", tags=["ports"])

