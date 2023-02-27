from fastapi import FastAPI
from api.routers import user, friend, event
app = FastAPI()

app.include_router(user.router)
app.include_router(friend.router)
app.include_router(event.router )