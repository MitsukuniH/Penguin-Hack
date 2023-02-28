from typing import Optional
from pydantic import BaseModel, Field

class FriendBase(BaseModel):
  userId: int
  friendId: int

  class Config:
    orm_mode = True

class Friend(FriendBase):
  id: int

class RegistarFriend(FriendBase):
  pass

class RegistarFriendResponse(Friend):
  pass