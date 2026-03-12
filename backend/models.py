from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from database import Base


class EventType(Base):
    __tablename__ = "event_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    duration = Column(Integer)
    slug = Column(String, unique=True)


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    event_type_id = Column(Integer, ForeignKey("event_types.id"))
    invitee_name = Column(String)
    invitee_email = Column(String)
    date = Column(Date)
    start_time = Column(Time)
    status = Column(String)
    

class Availability(Base):
    __tablename__ = "availability"

    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(String)
    start_time = Column(Time)
    end_time = Column(Time)