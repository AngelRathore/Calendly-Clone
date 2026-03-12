import { useEffect, useState } from "react"
import { getMeetings } from "../api/api"

const API = "http://127.0.0.1:8000"

function Meetings() {

  const [upcoming, setUpcoming] = useState([])
  const [past, setPast] = useState([])

  useEffect(() => {
    loadMeetings()
  }, [])

  async function loadMeetings() {
    const data = await getMeetings()
    setUpcoming(data.upcoming)
    setPast(data.past)
  }

  async function cancelMeeting(id) {
    await fetch(`${API}/meetings/${id}`, {
      method: "DELETE"
    })
    loadMeetings()
  }

  function formatDate(date, time) {
    return new Date(date + "T" + time).toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="meetings-page">

      <div className="meetings-container">

        <h1 className="meetings-title">Meetings</h1>

        <h2 className="section-title">Upcoming Meetings</h2>

        {upcoming.length === 0 && (
          <p className="empty-text">No upcoming meetings</p>
        )}

        {upcoming.map((meeting) => (
          <div className="meeting-card" key={meeting.id}>

            <div>
              <strong>{meeting.invitee_name}</strong>
              <div className="meeting-time">
                {formatDate(meeting.date, meeting.start_time)}
              </div>
            </div>

            <button
              className="delete-btn"
              onClick={() => cancelMeeting(meeting.id)}
            >
              Cancel
            </button>

          </div>
        ))}

        <h2 className="section-title">Past Meetings</h2>

        {past.length === 0 && (
          <p className="empty-text">No past meetings</p>
        )}

        {past.map((meeting) => (
          <div className="meeting-card past" key={meeting.id}>

            <div>
              <strong>{meeting.invitee_name}</strong>
              <div className="meeting-time">
                {formatDate(meeting.date, meeting.start_time)}
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Meetings