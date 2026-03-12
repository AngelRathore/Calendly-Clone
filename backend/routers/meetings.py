from fastapi import APIRouter
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Meeting
from pydantic import BaseModel
from datetime import date, time

router = APIRouter(prefix="/meetings")


class MeetingCreate(BaseModel):
    invitee_name: str
    invitee_email: str
    date: date
    start_time: time


@router.post("/")
def create_meeting(data: MeetingCreate):

    db: Session = SessionLocal()

    # prevent double booking
    existing = db.query(Meeting).filter(
        Meeting.date == data.date,
        Meeting.start_time == data.start_time
    ).first()

    if existing:
        db.close()
        return {"message": "This time slot is already booked"}

    meeting = Meeting(
        invitee_name=data.invitee_name,
        invitee_email=data.invitee_email,
        date=data.date,
        start_time=data.start_time
    )

    db.add(meeting)
    db.commit()
    db.close()

    return {"message": "Meeting booked successfully"}


@router.get("/")
def get_meetings():

    db: Session = SessionLocal()

    meetings = db.query(Meeting).order_by(
        Meeting.date, Meeting.start_time
    ).all()

    upcoming = []
    past = []

    today = date.today()

    for meeting in meetings:
        if meeting.date >= today:
            upcoming.append(meeting)
        else:
            past.append(meeting)

    db.close()

    return {
        "upcoming": upcoming,
        "past": past
    }


@router.delete("/{meeting_id}")
def cancel_meeting(meeting_id: int):

    db: Session = SessionLocal()

    meeting = db.query(Meeting).filter(
        Meeting.id == meeting_id
    ).first()

    if not meeting:
        db.close()
        return {"error": "Meeting not found"}

    db.delete(meeting)
    db.commit()
    db.close()

    return {"message": "Meeting cancelled"}