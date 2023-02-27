from typing import List, Tuple
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

@router.get("/eventList", response_model=List[event_schema.Event])
async def GetEvents(
  userId: int, db: AsyncSession=Depends(get_db)
):
  return await event_crud.GetEvents(db=db, userId=userId)

# @router.get("/eventList", response_model=List[event_schema.Event])
# async def GetEvents(
#   userId: int, db: AsyncSession=Depends(get_db)
# ):
#   event = await event_crud.GetEvents(db=db, userId=userId)

#   return event