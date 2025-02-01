from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, HTMLResponse, FileResponse
from pathlib import Path

from app import BASE_PATH_APP, BASE_PATH_ASSETS
from app.routers.Api import api

origins = [
    "http://localhost:9090"
]

app = FastAPI(title="SSG Roethenbach 1898", version="0.1.0")

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
    return RedirectResponse(url=BASE_PATH_APP)

@app.get("/static/{path:path}")
def provide_static(path):
    print(f"Requested: {path}")
    return FileResponse(path=f"frontend/assets/{path}")

@app.get(BASE_PATH_APP + "/{path:path}")
def provide_html(path):
    print(f"Requested: {path}")
    htmlContent = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SSG Roethenbach 1898</title>

            <link rel="stylesheet" href="/static/styles/light.css">
        </head>
        <body>
            <div class="notfound">
                <img src="/static/img/404.png" style="border-radius: 8px; max-width: 50%; height: 50%;"></img>
                <div>
                    Leider existiert die Seite nicht. 😒
                    <a href="{BASE_PATH_APP}">Hauptseite</a>
                </div>
            </div>
        </body>
    </html>
    """    
    if path == "":
        path = "index"
    
    file = Path(f"frontend/{path}.html")
    if file.exists():
        indexFile = Path(f"frontend/index.html")
        htmlContent = indexFile.read_text()
        
    return HTMLResponse(content=htmlContent)

app.include_router(api)