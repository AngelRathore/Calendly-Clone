const API = "https://calendly-clone-z04a.onrender.com"

/* ---------------- EVENTS ---------------- */

export async function getEvents() {
  const res = await fetch(`${API}/events/`)
  return await res.json()
}

export async function createEvent(name, duration, slug) {
  const res = await fetch(`${API}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      duration: duration,
      slug: slug
    })
  })

  return await res.json()
}

export async function deleteEvent(id) {
  const res = await fetch(`${API}/events/${id}`, {
    method: "DELETE"
  })

  return await res.json()
}


/* ---------------- SLOTS ---------------- */

export async function getSlots(eventId) {
  const res = await fetch(`${API}/slots/?event_id=${eventId}`)
  return await res.json()
}


/* ---------------- BOOKINGS ---------------- */

export async function bookMeeting(eventId, name, email, date, time) {

  const res = await fetch(`${API}/book/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event_id: eventId,
      invitee_name: name,
      invitee_email: email,
      date: date,
      start_time: time
    })
  })

  return await res.json()
}


/* ---------------- MEETINGS ---------------- */

export async function getMeetings() {
  const res = await fetch(`${API}/meetings/`)
  return await res.json()
}

export async function cancelMeeting(id) {

  const res = await fetch(`${API}/meetings/${id}`, {
    method: "DELETE"
  })

  return await res.json()
}