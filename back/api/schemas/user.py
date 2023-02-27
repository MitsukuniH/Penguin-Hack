from typing import Optional
from pydantic import BaseModel, Field

class UserBase(BaseModel):
  name: Optional[str] = Field(None)
  password: str = Field(..., min_lenght=8, max_lenght=16)

class User(UserBase):
  id: int

  class Config:
    orm_mode = True

class CreateUser(UserBase):
  pass

class CreateUserResponse(User):
  pass