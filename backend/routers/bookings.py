from fastapi import APIRouter
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Meeting
from pydantic import BaseModel
from datetime import date, time

router = APIRouter(prefix="/book")


class BookingRequest(BaseModel):
    event_id: int
    invitee_name: str
    invitee_email: str
    date: date
    start_time: time


@router.post("/")
def book_meeting(data: BookingRequest):

    db: Session = SessionLocal()

    # prevent double booking
    existing = db.query(Meeting).filter(
        Meeting.event_type_id == data.event_id,
        Meeting.date == data.date,
        Meeting.start_time == data.start_time
    ).first()

    if existing:
        return {"error": "Slot already booked"}

    meeting = Meeting(
        event_type_id=data.event_id,
        invitee_name=data.invitee_name,
        invitee_email=data.invitee_email,
        date=data.date,
        start_time=data.start_time,
        status="scheduled"
    )

    db.add(meeting)
    db.commit()

    return {"message": "Meeting booked successfully"}