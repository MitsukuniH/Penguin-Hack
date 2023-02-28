from typing import List, Optional, Tuple

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

import api.models.models as models
import api.schemas.friend as friend_schema

async def RegisterFriend(
  db: AsyncSession, data: friend_schema.RegistarFriend
) -> models.Friend:
  friend = models.Friend(**data.dict())
  db.add(friend)
  await db.commit()
  await db.refresh(friend)

  return friend

async def GetFriends(
  db: AsyncSession, userId: int
) -> Optional[list[Tuple[int]]]:
  friends: Result = await(
    db.execute(
      select(models.Friend.friendId).filter(models.Friend.userId==userId)
    )
  )

  return friends.all()
