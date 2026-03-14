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
    try:
        new_event = EventType(
            name=event.name,
            duration=event.duration,
            slug=event.slug
        )

        db.add(new_event)
        db.commit()
        db.refresh(new_event)

        return {
            "id": new_event.id,
            "name": new_event.name,
            "duration": new_event.duration,
            "slug": new_event.slug
        }

    finally:
        db.close()


@router.get("/")
def get_events():
    db: Session = SessionLocal()
    try:
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

    finally:
        db.close()


@router.delete("/{event_id}")
def delete_event(event_id: int):
    db: Session = SessionLocal()
    try:
        event = db.query(EventType).filter(EventType.id == event_id).first()

        if not event:
            return {"error": "Event not found"}

        db.delete(event)
        db.commit()

        return {"message": "Event deleted"}

    finally:
        db.close()


@router.put("/{event_id}")
def update_event(event_id: int, event: EventCreate):
    db: Session = SessionLocal()
    try:
        existing = db.query(EventType).filter(EventType.id == event_id).first()

        if not existing:
            return {"error": "Event not found"}

        existing.name = event.name
        existing.duration = event.duration
        existing.slug = event.slug

        db.commit()
        db.refresh(existing)

        return {
            "id": existing.id,
            "name": existing.name,
            "duration": existing.duration,
            "slug": existing.slug
        }

    finally:
        db.close()