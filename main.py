from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, HTMLResponse, FileResponse
from pathlib import Path

from app.const import BASE_PATH_APP, BASE_PATH_ASSETS, STANDARD_INDEX_PATH, NOTFOUND_FILE
from app.routers.api import api

import logging

origins = [
    "http://localhost:9090",
    # TODO Add production URL
]

api_routes_counter = str(len(api.routes))
app = FastAPI(title="SSG Roethenbach 1898", version="2025." + api_routes_counter + ".0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount(BASE_PATH_ASSETS, StaticFiles(directory="frontend", html=True), name="frontend")

@app.get("/")
def read_root():
    return RedirectResponse(url=f"{BASE_PATH_APP}/{STANDARD_INDEX_PATH}")

@app.get(f"{BASE_PATH_APP}")
def read_root_app():
    return RedirectResponse(url=f"{BASE_PATH_APP}/{STANDARD_INDEX_PATH}")

@app.get("/static/{path:path}")
def provide_static(path):
    logging.info(f"Requested: {path}")
    return FileResponse(path=f"frontend/assets/{path}")

@app.get(BASE_PATH_APP + "/{path:path}")
def provide_html(path):
    logging.info(f"Requested: {path}")
    
    # Standard response if file not found
    htmlContent = NOTFOUND_FILE.read_text("utf-8")
    
    if path == "":
        path = STANDARD_INDEX_PATH
    
    file = Path(f"frontend/{path.lower()}.html")
    if file.exists():
        htmlContent = file.read_text("utf-8")
        
    return HTMLResponse(content=htmlContent)

@app.exception_handler(404)
def not_found_exception_handler(request, exc):
    logging.error(f"404 Error: {exc}")
    return HTMLResponse(
        content=NOTFOUND_FILE
        .read_text("utf-8"), status_code=404)

app.include_router(api)

if __name__ == "__main__":
    import uvicorn
    import settings
    uvicorn.run(app, log_config=settings.LOGGING_CONFIG)