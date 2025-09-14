#
# API for content creation
#

import logging
import os
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException

from app.model import ContactForm, Navigation
from app.service import ConfigService
from app.const import BASE_PATH_CC_API, BASE_PATH_CC, BASE_PATH_CC_API_LOGIN

apiCC = APIRouter(prefix=BASE_PATH_CC_API)

configService = ConfigService()
config = configService.get_config()

# Used for authentication
SECRET = config["app"]["secret"]

# Login Manager
manager = LoginManager(SECRET, token_url=BASE_PATH_CC_API_LOGIN, use_cookie=False)
# FakeDB
fake_users_db = {
    "admin": {
        "password": "admin123!"  # In production, use hashed passwords!
    }
}

@apiCC.get("/navigation", response_model=list[Navigation])
async def get_navigation():
    return [
        Navigation(url=f"{BASE_PATH_CC}/posts", label="Posts", slag="posts"),
        Navigation(url=f"{BASE_PATH_CC}/edit", label="post", slag="post"),
        Navigation(url=f"{BASE_PATH_CC}/profile", label="Profile", slag="profile"),
    ]

#
# Load user
#
@manager.user_loader()
def load_user(username: str):
    user = fake_users_db.get(username)
    return user

@apiCC.post("/auth/token")
async def login_for_access_token(data: OAuth2PasswordRequestForm = Depends()):
    logging.info(f"Login attempt for user: {data}")
    username = data.username
    password = data.password

    user = load_user(username)  # we are using the same function to retrieve the user
    if not user:
        raise InvalidCredentialsException  # you can also use your own HTTPException
    elif password != user['password']:
        raise InvalidCredentialsException

    access_token = manager.create_access_token(
        data=dict(sub=username)
    )
    return {'access_token': access_token, 'token_type': 'bearer'}

