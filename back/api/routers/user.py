from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm.session import Session

import api.cruds.user as user_crud
import api.schemas.user as user_schema
from api.db import get_db

router = APIRouter()

@router.post("/signUp", response_model=user_schema.CreateUserResponse)
async def SignUp(
    data: user_schema.CreateUser, db: AsyncSession=Depends(get_db)
):
  exist = await user_crud.GetUserOnName(db=db, name=data.name)
  if exist is not None:
    raise HTTPException(status_code=400, detail="same name user already exist")
  return await user_crud.CreateUser(db=db, userCreate=data)

@router.post("/signIn", response_model=user_schema.User)
async def SignIn(
  data: user_schema.AuthUser, db: AsyncSession=Depends(get_db)
):
  user = await user_crud.AuthUser(db=db, data=data)
  if user is None:
    raise HTTPException(status_code=404, detail="User not found")
  
  return user

@router.get("/users/{user_id}", response_model=user_schema.User)
async def GetUser(
  userId: int, db: AsyncSession = Depends(get_db)
):
  return await user_crud.GetUser(db=db, userId=userId)

@router.get("/userList", response_model=List[user_schema.UserWithoutPass])
async def UserList(
  db: AsyncSession = Depends(get_db)
):
  return await user_crud.GetUsers(db=db)

@router.get("/searchUser/{userName}", response_model=list[str])
async def GetFriendNameList(
  userName: str, db: AsyncSession = Depends(get_db)
):
  users = await user_crud.SearchUsers(db=db, userName=userName)
  if users is None:
    raise HTTPException(status_code=404, detail="nobady hit")
  userArray: list[str] = []
  for userName in users:
    userArray.append(userName[0])
    print("debug------------------------")
    print(userName)
    print("debug------------------------")
  return userArray

@router.get("/userNames/{userName}", response_model=user_schema.User)
async def GetUser(
  userName: str, db: AsyncSession = Depends(get_db)
):
  return await user_crud.GetUserOnName(db=db, name=userName)