from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship

from api.db import Base

Friend = Table(
    'friend', Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column('userId', Integer, ForeignKey('users.id')),
    Column('friendId', Integer, ForeignKey('users.id'))
    )

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column(String(64), unique=True)
  password = Column(String(16))

  parents = relationship(
    'User',secondary=Friend,
    primaryjoin=Friend.c.userId==id,
    secondaryjoin=Friend.c.friendId==id,
    backref="children")
  
  event = relationship("Event", back_populates="user")
  participant = relationship("Participant", back_populates="user")

# class Friend(Base):
#   __tablename__ = "friends"

#   id = Column(Integer, primary_key=True, autoincrement=True)
#   userId = Column(Integer, ForeignKey("users.id"))
#   friendId = Column(Integer, ForeignKey("users.id"))

  # userId_ref = relationship('User', primaryjoin="Friend.userId==User.id")
  # friendId_ref = relationship('User', primaryjoin="Friend.friendId==User.id")
  # userId_ref = relationship("User", back_populates="friend_userId", foreign_keys=[userId])
  # friendId_ref = relationship("User", back_populates="friend_userId", foreign_keys=[friendId])

class Event(Base):
  __tablename__ = "events"

  id = Column(Integer, primary_key=True, autoincrement=True)
  ownerId = Column(Integer, ForeignKey("users.id"), index=True)
  title = Column(String(128), nullable=True)
  isOnce = Column(Boolean, nullable=False)
  date = Column(String(10), nullable=False)
  start = Column(String(5), nullable=False)
  end = Column(String(5), nullable=False)

  user = relationship("User", back_populates="event")
  participant = relationship("Participant", back_populates="event")

class Participant(Base):
  __tablename__ = "participants"

  eventId = Column(Integer, ForeignKey("events.id"), primary_key=True, index=True)
  participantId = Column(Integer, ForeignKey("users.id"), primary_key=True)

  user = relationship("User", back_populates="participant")
  event = relationship("Event", back_populates="participant")