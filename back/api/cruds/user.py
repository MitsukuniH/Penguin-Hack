from typing import Tuple, Optional, List

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

async def AuthUser(
    db: AsyncSession, data: user_schema.AuthUser
) -> Optional[models.User]:
    result: Result = await db.execute(
        select(models.User)
        .filter(models.User.name==data.name)
        .filter(models.User.password==data.password)
    )
    user: Optional[Tuple[models.User]] = result.first()
    return user[0] if user is not None else None


async def GetUser(db: AsyncSession, userId: int) -> Optional[models.User]:
    result: Result = await db.execute(
        select(models.User).filter(models.User.id==userId)
    )
    user: Optional[Tuple[models.User]] = result.first()
    return user[0] if user is not None else None

async def GetUserName(db: AsyncSession, userId: int) -> Optional[list[str]]:
    result: Result = await db.execute(
        select(models.User.name).filter(models.User.id==userId)
    )
    user: Optional[Tuple[str]] = result.first()
    return user[0] if user is not None else None

async def GetUserOnName(db: AsyncSession, name: str) -> Optional[models.User]:
    result: Result = await db.execute(
        select(models.User).filter(models.User.name==name)
    )
    user: Optional[Tuple[models.User]] = result.first()
    return user[0] if user is not None else None

async def GetUsers(db: AsyncSession) -> list[Tuple[int, str]]:
    users = await db.execute(
        select(
            models.User.id, 
            models.User.name
        )
    )
    return users.all()

async def SearchUsers(db: AsyncSession, userName: str) -> Optional[list[Tuple[str]]]:
  users: Result = await db.execute(
      select(models.User.name).filter(models.User.name.contains(userName))
    )

  return users.all()
