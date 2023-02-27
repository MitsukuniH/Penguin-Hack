from typing import Tuple, Optional

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

import api.models.models as models
import api.schemas.user as user_schema

async def CreateUser(
  db: AsyncSession, userCreate: user_schema.CreateUser
) -> models.User:
    user = models.User(**userCreate.dict())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

async def GetUser(db: AsyncSession, userId: int) -> Optional[models.User]:
    result: Result = await db.execute(
        select(models.User).filter(models.User.id==userId)
    )
    user: Optional[Tuple[models.User]] = result.first()
    return user[0] if user is not None else None
