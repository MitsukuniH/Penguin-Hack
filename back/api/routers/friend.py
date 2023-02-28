from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import api.cruds.friend as friend_crud
import api.cruds.user as user_crud
import api.schemas.friend as friend_schema
import api.schemas.user as user_schema
from api.db import get_db

router = APIRouter()

@router.post("/registarFriend", response_model=friend_schema.RegistarFriendResponse)
async def RegistarFriend(
  data: friend_schema.RegistarFriend, db: AsyncSession = Depends(get_db)
):
  user = user_crud.GetUser(db=db, userId=data.friendId)
  if user is None:
    return HTTPException(status_code=404, detail="not found user")
  return await friend_crud.RegisterFriend(db=db, data=data)

@router.get("/friendList/{userId}", response_model=list[str])
async def GetFriendNameList(
  userId: int, db: AsyncSession = Depends(get_db)
):
  friendIdList = await friend_crud.GetFriends(db=db, userId=userId)
  if friendIdList is None:
    raise HTTPException(status_code=404, detail="frinds not exist")
  friends: list[str] = []
  for friendId in friendIdList:
    friendName = await user_crud.GetUserName(db=db, userId=friendId[0])
    friends.append(friendName)

  return friends