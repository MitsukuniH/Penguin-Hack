from typing import Optional
from pydantic import BaseModel, Field
from datetime import date

class EventBase(BaseModel):
  title: Optional[str] = Field(None)
  isOnce: bool
  ownerId: int
  date: str = Field(..., regex="[0-9]{4}-[0-2][0-9]-[0-3][0-9]")
  # date: date
  start: str = Field(..., regex="^[0-2][0-9]:[0-5][0-9]$")
  end: str = Field(..., regex="^[0-2][0-9]:[0-5][0-9]$")

class Event(EventBase):
  id: int

  class Config:
    orm_mode = True

class CreateEvent(EventBase):
  pass

class CreateEventResponse(Event):
  pass

class GetEventOnDate(BaseModel):
  ownerId: int
  date: str = Field(..., regex="[0-9]{4}-[0-2][0-9]-[0-3][0-9]")
  class Config:
    orm_mode = True

class EventWithoutTitleOwner(BaseModel):
  isOnce: bool
  date: str = Field(..., regex="[0-9]{4}-[0-2][0-9]-[0-3][0-9]")
  # date: date
  start: str = Field(..., regex="^[0-2][0-9]:[0-5][0-9]$")
  end: str = Field(..., regex="^[0-2][0-9]:[0-5][0-9]$")
  id: int

  class Config:
    orm_mode = True