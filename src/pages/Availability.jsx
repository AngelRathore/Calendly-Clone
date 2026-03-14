import { useState, useEffect } from "react"

const API = "https://calendly-clone-1.onrender.com"

function Availability() {

  const [day, setDay] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [availability, setAvailability] = useState([])
  const [message, setMessage] = useState("")

  async function loadAvailability() {
    try {
      const res = await fetch(`${API}/availability/`)
      const data = await res.json()
      setAvailability(data)
    } catch (err) {
      console.error("Failed to load availability")
    }
  }

  useEffect(() => {
    loadAvailability()
  }, [])

  async function handleAdd() {
    try {

      const res = await fetch(`${API}/availability/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          day_of_week: day,
          start_time: start,
          end_time: end
        })
      })

      const data = await res.json()

      // SUCCESS CASE
      if (data.id) {

        setMessage("Availability added")

        // add new availability to UI
        setAvailability(prev => [
          ...prev,
          data
        ])

        setDay("")
        setStart("")
        setEnd("")

      } else {

        // error message from backend
        setMessage(data.message)

      }

    } catch (err) {
      console.error("Failed to add availability")
    }
  }

  async function handleDelete(id) {
    try {

      await fetch(`${API}/availability/${id}`, {
        method: "DELETE"
      })

      // remove from UI
      setAvailability(prev =>
        prev.filter(a => a.id !== id)
      )

    } catch (err) {
      console.error("Failed to delete availability")
    }
  }

  return (
    <div className="availability-page">

      <div className="container">

        <h1 className="title">Availability</h1>

        {message && (
          <p className="error-message">{message}</p>
        )}

        <div className="availability-form">

          <select
            className="input"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <input
            className="input"
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <input
            className="input"
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          <button
            className="button"
            onClick={handleAdd}
            disabled={!day || !start || !end}
          >
            Add
          </button>

        </div>

        <h2 className="section-title">Existing Availability</h2>

        {availability.map((a) => (
          <div className="card" key={a.id}>
            <span>
              {a.day_of_week} — {a.start_time} to {a.end_time}
            </span>

            <button
              className="delete-btn"
              onClick={() => handleDelete(a.id)}
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Availability