from pydantic import BaseModel, Field

class Navigation(BaseModel):
    url: str = Field(..., title="URL of the page")
    label: str = Field(..., title="Label of the page")
    
class ContactForm(BaseModel):
    name: str = Field(..., title="Name of the person")
    email: str = Field(..., title="Email address of the person")
    message: str = Field(..., title="Message of the person")
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Max Mustermann",
                "email": "max@mustermann.de",
                "message": "This is a form message",
            }
        }
