from typing import List, Optional

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

import api.models.models as models
import api.schemas.friend as friend_schema

# async def RegisterFriend(
#   db: AsyncSession, userId: int, friendId: int
# ) -> models.Friend:
#   friend = models.Friend({userId: userId, friendId: friendId})
#   db.add(friend)
#   await db.commit()
#   await db.refresh(friend)

#   return friend

# async def GetFriends(
#   db: AsyncSession, userId: int
# ) -> List[models.Friend]:
#   friends = await(
#     db.execute(
#     select(models.Friend).filter(models.Friend.c.userId==userId)
#     )
#   )
#   return friends.all()
