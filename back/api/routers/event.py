from typing import List, Tuple, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import api.cruds.event as event_crud
import api.cruds.user as user_crud
import api.schemas.event as event_schema
from api.db import get_db

router = APIRouter()

@router.post("/createEvent", response_model=event_schema.CreateEventResponse)
async def CreateEvent(
  data: event_schema.CreateEvent, db: AsyncSession=Depends(get_db)
):
  return await event_crud.CreateEvent(db=db, data=data)

@router.post("/eventListOnUser", response_model=Optional[list[event_schema.Event]])
async def GetEvents(
  userId: int, db: AsyncSession=Depends(get_db)
):
  return await event_crud.GetEventsOnUser(db=db, userId=userId)

@router.get("/privateEventList/{userId}", response_model=list[event_schema.EventWithoutTitleOwner])
async def GetPrivateEvents(
  userId: int, db: AsyncSession=Depends(get_db)
):
  return await event_crud.GetEventsWithoutTitleOwner(db=db, userId=userId)

@router.get("/publicEventList/{userId}", response_model=Optional[list[event_schema.Event]])
async def GetPublicEvent(
  userId: int, db: AsyncSession=Depends(get_db)
):
  return await event_crud.GetEventsWithoutNoneTitle(db=db, userId=userId)
@router.post("/eventListOnDate", response_model=Optional[list[event_schema.Event]])
async def GetEvents(
  data: event_schema.GetEventOnDate, db: AsyncSession=Depends(get_db)
):
  events = await event_crud.GetEventsOnDate(db=db, data=data)

  return events

@router.delete("/deleteEvent/{eventId}", response_model=None)
async def RemoveEvent(
  eventId: int, db: AsyncSession=Depends(get_db)
):
  event = await event_crud.GetEvent(db=db, eventId=eventId)
  if event is None:
    raise HTTPException(status_code=404, detail="Event not found")
    
  return await event_crud.RemoveEvent(db, original=event)