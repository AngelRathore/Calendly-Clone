# Calendly Clone – Scheduling Platform

A full-stack scheduling and meeting booking platform inspired by Calendly.
Users can create meeting event types, define their availability, and allow others to book available time slots through a public booking page.

This project replicates the core scheduling workflow used in modern meeting platforms.

---
## Live Demo
Note: The backend is deployed on Render's free tier and may take 40–50 seconds to wake up after a period of inactivity. Please allow a moment for the server to start if the site initially appears unresponsive.

Frontend:  
https://calendly-frontend.onrender.com

Backend API (Swagger Docs):  
https://calendly-clone-1.onrender.com/docs


## Features

### Event Management

* Create meeting event types
* Define meeting duration
* Delete events

### Availability Scheduling

* Add weekly availability
* View available days and times
* Delete availability slots

### Booking System

* Public booking page
* Select event date
* View available time slots
* Book meetings with name and email

### Meetings Dashboard

* View upcoming meetings
* View past meetings
* Cancel scheduled meetings

---

## Tech Stack

**Frontend**

* React
* JavaScript
* CSS

**Backend**

* FastAPI
* Python

**Database**

* SQLite

---

## Project Structure

```
project-root
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   └── api
│   └── package.json
│
├── backend
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── requirements.txt
│
└── README.md
```

---

## How to Run the Project

### 1. Clone the Repository

```
git clone https://github.com/yourusername/calendly-clone.git
cd calendly-clone
```

---

### 2. Backend Setup (FastAPI)

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

```
http://https://calendly-clone-z04a.onrender.com
```

---

### 3. Frontend Setup (React)

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoints

### Events

* `GET /events` – Get all events
* `POST /events` – Create event
* `DELETE /events/{id}` – Delete event

### Availability

* `GET /availability`
* `POST /availability`
* `DELETE /availability/{id}`

### Meetings

* `GET /meetings`
* `POST /book`
* `DELETE /meetings/{id}`

---

## Screens Included in the Application

* Schedule Page (Create Events)
* Availability Page (Set Time Slots)
* Booking Page (Public Booking)
* Meetings Dashboard (Upcoming / Past)

---

## Future Improvements

* Calendar integrations
* Email notifications
* Authentication system
* Google Calendar sync
* Timezone support

---

## Author

Angel Rathore

---

## License

This project is for educational and demonstration purposes.
