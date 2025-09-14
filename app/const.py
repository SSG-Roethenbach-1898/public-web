from pathlib import Path

BASE_PATH_APP="/ssg"
BASE_PATH_ASSETS="/assets"
BASE_PATH_API="/api"
FRONTEND_PATH = Path("public-frontend")

BASE_PATH_CC="/cc"
BASE_PATH_CC_ASSETS="/assets"
BASE_PATH_CC_API="/api/cc"
BASE_PATH_CC_API_LOGIN=f"{BASE_PATH_CC_API}/auth/login"
CC_FRONTEND_PATH = Path("cc-frontend")

STANDARD_INDEX_PATH="aktuelles"

# Config path
CONFIG_PATH = Path(".env.yaml").resolve()

# Add HTML Components here for suggestions in the frontend and restriction
HTML_COMPONENTS = [
    "navigation-menu", 
    "gallery-carousel",
    "content-card"
    "footer-content", 
    "contact-form", 
]