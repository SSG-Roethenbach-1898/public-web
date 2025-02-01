from fastapi import APIRouter
from app.Model import Navigation

from app import BASE_PATH_APP

api = APIRouter(prefix="/api")

@api.get("/navigation", response_model=list[Navigation])
async def get_navigation():
    return [
        Navigation(url=f"{BASE_PATH_APP}/about", label="Der Verein"),
        Navigation(url=f"{BASE_PATH_APP}/contact", label="Kontakt")
    ]
