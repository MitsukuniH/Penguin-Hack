from typing import Optional, List, Tuple

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

import api.models.models as models
import api.schemas.event as event_schema

async def CreateEvent(
  db: AsyncSession, data: event_schema.CreateEvent
) -> models.Event:
  event = models.Event(**data.dict())
  db.add(event)
  await db.commit()
  await db.refresh(event)
  return event

async def GetEventsOnUser(
  db: AsyncSession, userId: int
) -> Optional[list[Tuple[int, str, int, bool, str, str, str]]]:
  events :Result = await db.execute(
    select(
      models.Event.id,
      models.Event.title,
      models.Event.ownerId,
      models.Event.isOnce,
      models.Event.date,
      models.Event.start,
      models.Event.end
    ).filter(models.Event.ownerId==userId)
  )
  return events.all()

async def GetEventsOnDate(
  db: AsyncSession, data: event_schema.GetEventOnDate
) -> Optional[list[Tuple[int, str, int, bool, str, str, str]]]:
  events :Result = await db.execute(
    select(
      models.Event.id,
      models.Event.title,
      models.Event.ownerId,
      models.Event.isOnce,
      models.Event.date,
      models.Event.start,
      models.Event.end
    ).filter(models.Event.ownerId==data.ownerId).filter(models.Event.date==data.date)
  )
  return events.all()

async def GetEventsWithoutTitleOwner(
  db: AsyncSession, userId: int
) -> Optional[list[Tuple[int, str, int, bool, str, str, str]]]:
  events :Result = await db.execute(
    select(
      models.Event.id,
      models.Event.isOnce,
      models.Event.date,
      models.Event.start,
      models.Event.end
    ).filter(models.Event.ownerId==userId).filter(models.Event.title==None)
  )
  return events.all()

async def GetEventsWithoutNoneTitle(
  db: AsyncSession, userId: int
) -> Optional[list[Tuple[int, str, int, bool, str, str, str]]]:
  events :Result = await db.execute(
    select(
      models.Event.id,
      models.Event.title,
      models.Event.ownerId,
      models.Event.isOnce,
      models.Event.date,
      models.Event.start,
      models.Event.end
    ).filter(models.Event.ownerId==userId).filter(models.Event.title!=None)
  )
  return events.all()

async def GetEvent(
  db: AsyncSession, eventId: int
) -> Optional[event_schema.Event]:
  result :Result = await db.execute(
    select(models.Event).filter(models.Event.id==eventId)
  )
  event = result.first()
  return event[0] if event is not None else None

async def RemoveEvent(
  db: AsyncSession, original: event_schema.Event
) -> None:
  await db.delete(original)
  await db.commit()