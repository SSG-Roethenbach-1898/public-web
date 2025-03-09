import logging
import os
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.model import ContactForm, Navigation

from app.const import BASE_PATH_APP

api = APIRouter(prefix="/api")

@api.get("/navigation", response_model=list[Navigation])
async def get_navigation():
    return [
        Navigation(url=f"{BASE_PATH_APP}/aktuelles", label="Aktuelles", slag="aktuelles"),
        Navigation(url=f"{BASE_PATH_APP}/der-verein", label="Der Verein", slag="der-verein"),
        Navigation(url=f"{BASE_PATH_APP}/kontakt", label="Kontakt", slag="kontakt"),
        Navigation(url=f"{BASE_PATH_APP}/impressum-datenschutz", label="Impressum & Datenschutz", slag="impressum"),
    ]

@api.get("/gallery")
async def get_gallery():
    return os.listdir("frontend/assets/img/gallery")

@api.post("/contact")
async def post_contact(cf: ContactForm):
    logging.info(f"Contact form submitted: {cf}")
    # TODO implement receiving mail and notify customer
    #return JSONResponse(content={"message": "Some error occurred."}, status_code=500)
    return JSONResponse(content={"message": "Contact form submitted successfully."})