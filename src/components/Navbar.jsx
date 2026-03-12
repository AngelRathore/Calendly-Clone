import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">

      <div className="navbar-inner">

        <div className="logo">
          Calendly Clone
        </div>

        <div className="nav-links">

          <NavLink
            to="/availability"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Availability
          </NavLink>

          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Schedule
          </NavLink>

          <NavLink
            to="/book"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Book
          </NavLink>

          <NavLink
            to="/meetings"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Meetings
          </NavLink>

        </div>

      </div>

    </div>
  )
}

export default Navbar