from pydantic import BaseModel, Field

class Navigation(BaseModel):
    url: str = Field(..., title="URL of the page")
    label: str = Field(..., title="Label of the page")
    slag: str = Field(..., title="Slag of the page")
    
class ContactForm(BaseModel):
    anrede: str = Field(..., title="Anrede of the person")
    name: str = Field(..., title="Name of the person")
    email: str = Field(..., title="Email address of the person")
    phone: str = Field(..., title="Phone number")
    message: str = Field(..., title="Message of the person")
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Max Mustermann",
                "phone": "+49123456789",
                "email": "max@mustermann.de",
                "message": "This is a form message",
            }
        }
