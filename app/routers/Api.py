from fastapi import APIRouter
from app.model import Navigation

from app.const import BASE_PATH_APP

api = APIRouter(prefix="/api")

@api.get("/navigation", response_model=list[Navigation])
async def get_navigation():
    return [
        Navigation(url=f"{BASE_PATH_APP}/aktuelles", label="Aktuelles"),
        Navigation(url=f"{BASE_PATH_APP}/der-verein", label="Der Verein"),
        Navigation(url=f"{BASE_PATH_APP}/kontakt", label="Kontakt"),
        Navigation(url=f"{BASE_PATH_APP}/impressum-datenschutz", label="Impressum & Datenschutz"),
    ]
