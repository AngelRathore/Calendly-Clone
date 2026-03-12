import { useEffect, useState } from "react"
import { getEvents, getSlots, bookMeeting } from "../api/api"

function BookingPage() {

  const [events, setEvents] = useState([])
  const [slots, setSlots] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    try {
      const data = await getEvents()
      setEvents(data || [])
    } catch (err) {
      console.error(err)
    }
  }

  async function handleSelectEvent(eventId) {
    try {
      setSelectedEvent(eventId)
      setSelectedSlot(null)

      const data = await getSlots(eventId)
      setSlots(data?.slots || [])
    } catch (err) {
      console.error(err)
      setSlots([])
    }
  }

  async function handleBook() {
    if (!name || !email || !selectedSlot) {
      alert("Please fill all fields")
      return
    }

    try {
      const selectedEventData = events.find(e => e.id === selectedEvent)

      const res = await bookMeeting(
        selectedEvent,
        name,
        email,
        selectedEventData?.name,
        selectedSlot
      )

      if (res?.error) {
        alert(res.error)
        return
      }

      alert("Meeting booked successfully!")

      setSelectedSlot(null)
      setName("")
      setEmail("")

      handleSelectEvent(selectedEvent)

    } catch (err) {
      console.error(err)
      alert("Booking failed")
    }
  }

  return (
    <div className="book-page">

      <div className="book-container">

        <h1 className="book-title">Book a Meeting</h1>

        <div className="booking-layout">

          <div className="booking-left">

            <h2 className="section-title">Select Meeting Date</h2>

            {events.length === 0 && (
              <p className="empty-text">No events available</p>
            )}

            <div className="events-list">

              {events.map((event) => (
                <button
                  key={event.id}
                  className={`event-card ${
                    selectedEvent === event.id ? "selected-event" : ""
                  }`}
                  onClick={() => handleSelectEvent(event.id)}
                >
                  <div className="event-date">
                    Meeting on {event.name}
                  </div>

                  <div className="event-duration">
                    {event.duration} mins
                  </div>
                </button>
              ))}

            </div>

          </div>

          <div className="booking-right">

            {selectedEvent && (
              <>
                <h2 className="section-title">Available Slots</h2>

                {slots.length === 0 && (
                  <p className="empty-text">No slots available</p>
                )}

                <div className="slots-grid">

                  {slots.map((slot, index) => {

                    const isBooked = slot.booked

                    return (
                      <button
                        key={index}
                        disabled={isBooked}
                        className={`slot-button
                          ${selectedSlot === slot.time ? "selected-slot" : ""}
                          ${isBooked ? "booked-slot" : ""}
                        `}
                        onClick={() => setSelectedSlot(slot.time)}
                      >
                        {slot.time} {isBooked ? "• booked" : ""}
                      </button>
                    )
                  })}

                </div>
              </>
            )}

            {selectedSlot && (
              <div className="booking-form">

                <h3 className="form-title">
                  Selected Slot: {selectedSlot}
                </h3>

                <input
                  className="input"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  className="button"
                  onClick={handleBook}
                >
                  Confirm Booking
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default BookingPage