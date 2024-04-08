import os
import json
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String
from sqlalchemy.orm import Session
from sqlalchemy import create_engine


Engine = create_engine(os.environ.get('SQLALCHEMY_DATABASE_URI'))

Base = declarative_base()


class Serializable:
    def as_json(self):
        return json.dumps(self.as_dict())

    def as_dict(self):
        if self.__tablename__ is None:
            return super(self).as_dict()
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Poll(Base, Serializable):
    __tablename__ = 'polls'
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)


class PollOption(Base, Serializable):
    __tablename__ = 'poll_options'
    id = Column(String, ForeignKey('polls.id'), primary_key=True)
    number = Column(Integer, nullable=False)
    poll_id = Column(String, ForeignKey('polls.id'))
    text = Column(String, nullable=False)


# Creating all tables every time we need them.
# Is this production-grade? No, but let's be real you don't have time right now
# to go fiddling with DB connection strings or stale file descriptors to
# postgres. If you even read this you're gonna spend, like, three more seconds
# on this before poking around the React app.
#
# Say hi to Ritz for me.
print(Base.metadata.create_all(Engine))
