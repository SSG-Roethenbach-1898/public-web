from pydantic import BaseModel, Field

class Navigation(BaseModel):
    url: str = Field(..., title="URL of the page")
    label: str = Field(..., title="Label of the page")