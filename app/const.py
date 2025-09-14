from pathlib import Path

BASE_PATH_APP="/ssg"
BASE_PATH_ASSETS="/assets"
BASE_PATH_API="/api"

STANDARD_INDEX_PATH="aktuelles"
FRONTEND_PATH = Path("public-frontend")
NOTFOUND_FILE=Path(f"{FRONTEND_PATH}/404.html")

# Config path
CONFIG_PATH = Path(".env.yaml").resolve()

# TODO register JS components here for CMS suggestions
JS_COMPONENTS = [
    "navigation-menu", 
    "gallery-carousel",
    "content-card"
    "footer-content", 
    "contact-form", 
]