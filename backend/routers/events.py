from fastapi import APIRouter
from sqlalchemy.orm import Session
from database import SessionLocal
from models import EventType
from pydantic import BaseModel

router = APIRouter(prefix="/events")


class EventCreate(BaseModel):
    name: str
    duration: int
    slug: str


@router.post("/")
def create_event(event: EventCreate):

    db: Session = SessionLocal()

    new_event = EventType(
        name=event.name,
        duration=event.duration,
        slug=event.slug
    )

    db.add(new_event)
    db.commit()

    return {"message": "Event created"}


@router.get("/")
def get_events():

    db: Session = SessionLocal()

    events = db.query(EventType).all()

    return [
        {
            "id": e.id,
            "name": e.name,
            "duration": e.duration,
            "slug": e.slug
        }
        for e in events
    ]


@router.delete("/{event_id}")
def delete_event(event_id: int):

    db: Session = SessionLocal()

    event = db.query(EventType).filter(
        EventType.id == event_id
    ).first()

    if not event:
        return {"error": "Event not found"}

    db.delete(event)
    db.commit()

    return {"message": "Event deleted"}


@router.put("/{event_id}")
def update_event(event_id: int, event: EventCreate):

    db: Session = SessionLocal()

    existing = db.query(EventType).filter(
        EventType.id == event_id
    ).first()

    if not existing:
        return {"error": "Event not found"}

    existing.name = event.name
    existing.duration = event.duration
    existing.slug = event.slug

    db.commit()

    return {"message": "Event updated"}