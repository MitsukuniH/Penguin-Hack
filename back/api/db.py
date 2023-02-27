from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ASYNC_DB_URL = "mysql+aiomysql://root@db:3306/PSdb?charset=utf8"
ASYNC_DB_URL = "mysql+aiomysql://root@db:3306/docker_db?charset=utf8&password=root"


async_engine = create_async_engine(ASYNC_DB_URL, echo=True)
async_session = sessionmaker(
    autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession
)

Base = declarative_base()

async def get_db():
    async with async_session() as session:
        yield session