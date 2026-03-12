import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

import EventTypes from "./pages/EventTypes"
import BookingPage from "./pages/BookingPage"
import Meetings from "./pages/Meetings"
import Availability from "./pages/Availability"

function App() {
  return (
    <BrowserRouter>

      {/* Navbar added here */}
      <Navbar />

      <Routes>
        <Route path="/" element={<EventTypes />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/meetings" element={<Meetings />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App