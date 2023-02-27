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

async def GetEvents(
  db: AsyncSession, userId: int
) -> List[models.Event]:
  events :Result = await db.execute(
    select(models.Event).filter(models.Event.ownerId==userId)
  )
  print("DEBUG------------")
  print(events)
  res = map(event_schema.Event.from_orm, events.all())
  # result = list(map(event_schema.Event.from_orm, events.all()))
  print(res)
  result = list(res)
  print("DEGUB END--------------")
  return result

# async def GetEvents(
#   db: AsyncSession, userId: int
# ) -> List[Tuple[int]]:
#   events :Result = await db.execute(
#     select(models.Event.ownerId).filter(models.Event.ownerId==userId)
#   )
#   event = events.all()
#   return events.all() if events is not None else None