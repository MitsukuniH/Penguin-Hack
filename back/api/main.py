from fastapi import FastAPI
from api.routers import user, friend, event
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
  "http://localhost:8000",
  "http://localhost:3000"
]
app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_methods=["*"]
)

app.include_router(user.router)
app.include_router(friend.router)
app.include_router(event.router )