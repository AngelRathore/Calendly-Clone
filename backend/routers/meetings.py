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


@router.get("/")
def get_meetings():
    db: Session = SessionLocal()
    try:

        meetings = db.query(Meeting).order_by(
            Meeting.date, Meeting.start_time
        ).all()

        upcoming = []
        past = []

        today = date.today()

        for m in meetings:
            meeting_data = {
                "id": m.id,
                "invitee_name": m.invitee_name,
                "invitee_email": m.invitee_email,
                "date": str(m.date),
                "start_time": str(m.start_time),
                "status": m.status
            }

            if m.date >= today:
                upcoming.append(meeting_data)
            else:
                past.append(meeting_data)

        return {
            "upcoming": upcoming,
            "past": past
        }

    finally:
        db.close()


@router.delete("/{meeting_id}")
def cancel_meeting(meeting_id: int):
    db: Session = SessionLocal()
    try:

        meeting = db.query(Meeting).filter(
            Meeting.id == meeting_id
        ).first()

        if not meeting:
            return {"error": "Meeting not found"}

        db.delete(meeting)
        db.commit()

        return {"message": "Meeting cancelled"}

    finally:
        db.close()