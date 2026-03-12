import { useState, useEffect } from "react"

function Availability() {

  const [day, setDay] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [availability, setAvailability] = useState([])
  const [message, setMessage] = useState("")

  async function loadAvailability() {
    const res = await fetch("http://127.0.0.1:8000/availability/")
    const data = await res.json()
    setAvailability(data)
  }

  useEffect(() => {
    loadAvailability()
  }, [])

  async function handleAdd() {

    const res = await fetch("http://127.0.0.1:8000/availability/", {
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

    setMessage(data.message)

    if (data.message === "Availability added") {
      setDay("")
      setStart("")
      setEnd("")
      loadAvailability()
    }
  }

  async function handleDelete(id) {
    await fetch(`http://127.0.0.1:8000/availability/${id}`, {
      method: "DELETE"
    })

    loadAvailability()
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