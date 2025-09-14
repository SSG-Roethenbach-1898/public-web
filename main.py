from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.requests import Request
from fastapi.responses import RedirectResponse, HTMLResponse, FileResponse
from starlette.templating import Jinja2Templates
from pathlib import Path

from app.const import BASE_PATH_APP, BASE_PATH_ASSETS, STANDARD_INDEX_PATH, NOTFOUND_FILE, FRONTEND_PATH
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

app.mount(BASE_PATH_ASSETS, StaticFiles(directory=FRONTEND_PATH, html=True), name="frontend")
templates = Jinja2Templates(directory="app/templates")

@app.get("/")
def read_root():
    return RedirectResponse(url=f"{BASE_PATH_APP}/{STANDARD_INDEX_PATH}")

@app.get(f"{BASE_PATH_APP}")
def read_root_app():
    return RedirectResponse(url=f"{BASE_PATH_APP}/{STANDARD_INDEX_PATH}")

@app.get(BASE_PATH_APP + "/{path:path}", response_class=HTMLResponse)
async def render_site(path: Path, request: Request):
    logging.info(f"Requested: {path}")
    
    if path == "":
        path = STANDARD_INDEX_PATH
    
    try:
        basic_context = {
                "show_navigation": True,
                "show_footer": True
            }
        
        # TODO Add page specific context here from db needed
        
        return templates.TemplateResponse(name=f"{path}.html",
            request=request,
            context=basic_context
        )
    except Exception as e:
        logging.error(f"Error rendering template {path}: {e}")
        if "not found" in str(e).lower():
            path = "404"
        else:
            path = "500"
            
        return templates.TemplateResponse(name=f"{path}.html",
            request=request,
            context={
                "show_navigation": True,
                "show_footer": False
            }
        )
    
@app.get("/static/{path:path}")
def provide_static(path):
    logging.info(f"Requested: {path}")
    return FileResponse(path=f"{FRONTEND_PATH}/assets/{path}")

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