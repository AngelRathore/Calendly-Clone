from fastapi import APIRouter
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Availability
from pydantic import BaseModel
from datetime import time

router = APIRouter(prefix="/availability")


class AvailabilityCreate(BaseModel):
    day_of_week: str
    start_time: time
    end_time: time




@router.post("/")
def create_availability(data: AvailabilityCreate):

    db: Session = SessionLocal()

    # check invalid time range
    if data.start_time >= data.end_time:
        return {"message": "End time must be after start time"}

    # check overlapping availability
    overlap = db.query(Availability).filter(
        Availability.day_of_week == data.day_of_week,
        Availability.start_time < data.end_time,
        Availability.end_time > data.start_time
    ).first()

    if overlap:
        return {"message": "Availability overlaps with existing time"}

    availability = Availability(
        day_of_week=data.day_of_week,
        start_time=data.start_time,
        end_time=data.end_time
    )

    db.add(availability)
    db.commit()

    return {"message": "Availability added"}


@router.get("/")
def get_availability():

    db: Session = SessionLocal()

    availability = db.query(Availability).all()

    return [
        {
            "id": a.id,
            "day_of_week": a.day_of_week,
            "start_time": str(a.start_time),
            "end_time": str(a.end_time)
        }
        for a in availability
    ]
    
    
@router.delete("/{id}")
def delete_availability(id: int):

    db: Session = SessionLocal()

    availability = db.query(Availability).filter(Availability.id == id).first()

    if availability:
        db.delete(availability)
        db.commit()

    return {"message": "Availability deleted"}