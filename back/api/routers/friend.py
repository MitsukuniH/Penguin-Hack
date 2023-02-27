from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import api.cruds.friend as friend_crud
import api.cruds.user as user_crud
import api.schemas.friend as friend_schema
from api.db import get_db

router = APIRouter()

@router.post("/registarFriend/{userId}", response_model=friend_schema.RegistarFriendResponse)
async def RegistarFriend(
  friendId: int, userId: int, db: AsyncSession = Depends(get_db)
):
  user = user_crud.GetUser(db=db, userId=friendId)
  if user is None:
    return HTTPException(status_code=404, detail="not found user")
  return await friend_crud.RegisterFriend(db=db, userId=userId, friendId=friendId)