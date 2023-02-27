from sqlalchemy import create_engine

from api.models.models import Base

DB_URL = "mysql+pymysql://root@db:3306/docker_db?charset=utf8&password=root"
engine = create_engine(DB_URL, echo=True)

def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    reset_database()