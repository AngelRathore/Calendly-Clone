from fastapi import APIRouter
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Availability, EventType, Meeting
from utils.slots import generate_slots

router = APIRouter(prefix="/slots")


@router.get("/")
def get_slots(event_id: int):

    db: Session = SessionLocal()

    try:
        event = db.query(EventType).filter(
            EventType.id == event_id
        ).first()

        if not event:
            return {"error": "Event not found"}

        availability = db.query(Availability).first()

        if not availability:
            return {"error": "Availability not set"}

        # generate time slots
        slots = generate_slots(
            availability.start_time,
            availability.end_time,
            event.duration
        )

        # fetch booked meetings
        booked_meetings = db.query(Meeting).filter(
            Meeting.event_type_id == event_id
        ).all()

        booked_times = [str(m.start_time) for m in booked_meetings]

        slot_data = []

        for slot in slots:
            slot_str = str(slot)

            slot_data.append({
                "time": slot_str,
                "booked": slot_str in booked_times
            })

        return {
            "event": event.name,
            "slots": slot_data
        }

    finally:
        db.close()