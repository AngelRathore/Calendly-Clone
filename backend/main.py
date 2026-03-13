from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import events
from routers import availability
from routers import slots
from routers import bookings
from routers import meetings

app = FastAPI(redirect_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://calendly-frontend.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create database tables
models.Base.metadata.create_all(bind=engine)

# include routers
app.include_router(events.router)
app.include_router(availability.router)
app.include_router(slots.router)
app.include_router(bookings.router)
app.include_router(meetings.router)
@app.get("/")
def home():
    return {"message": "Calendly Backend Running"}


