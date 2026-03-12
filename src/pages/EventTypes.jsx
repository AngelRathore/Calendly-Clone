import { useEffect, useState } from "react"
import { getEvents, createEvent, deleteEvent } from "../api/api"

function EventTypes() {

  const [events, setEvents] = useState([])
  const [date, setDate] = useState("")
  const [duration, setDuration] = useState("")

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    const data = await getEvents()
    setEvents(data)
  }

  async function handleCreate() {

    if (!date || !duration) {
      alert("Please enter meeting date and duration")
      return
    }

    const slug = date + "-" + Date.now()

    await createEvent(date, parseInt(duration), slug)

    setDate("")
    setDuration("")

    loadEvents()
  }

  async function handleDelete(id) {

    const confirmDelete = window.confirm("Delete this meeting?")
    if (!confirmDelete) return

    await deleteEvent(id)

    loadEvents()
  }

  return (

    <div className="schedule-page">

      <div className="schedule-container">

        <h1 className="schedule-title">Meeting Schedule</h1>

        {/* FORM */}
        <div className="schedule-form">

          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            className="input"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button
            className="create-btn"
            onClick={handleCreate}
          >
            Create
          </button>

        </div>

        {/* EXISTING MEETINGS */}
        <h2 className="section-title">Existing Meetings</h2>

        {events.map((event) => (

          <div key={event.id} className="meeting-card">

            <span>
              {event.name} — {event.duration} mins
            </span>

            <button
              className="delete-btn"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  )
}

export default EventTypes