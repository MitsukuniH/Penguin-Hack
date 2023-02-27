from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import api.cruds.user as user_crud
import api.schemas.user as user_schema
from api.db import get_db

router = APIRouter()

@router.post("/signUp", response_model=user_schema.CreateUserResponse)
async def SignUp(
    userBody: user_schema.CreateUser, db: AsyncSession=Depends(get_db)
):
  return await user_crud.CreateUser(db=db, userCreate=userBody)

@router.get("/users/{user_id}", response_model=user_schema.User)
async def GetUser(
  userId: int, db: AsyncSession = Depends(get_db)
):
  return await user_crud.GetUser(db=db, userId=userId)