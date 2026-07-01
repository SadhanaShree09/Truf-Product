import { useState } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import Icon from '../shared/Icon.jsx'
import TurfCard from './TurfCard.jsx'
import { sidebarItems, turfs } from '../../data/dashboard.js'

const AUTH_STORAGE_KEY = 'turf-play-auth-user'

function readStoredUser() {
  try {
    const rawUser = sessionStorage.getItem(AUTH_STORAGE_KEY)
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    return null
  }
}

function DashboardPage() {
  const [activeItem, setActiveItem] = useState('Home')
  const location = useLocation()
  const user = location.state?.user || readStoredUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span>⚽</span>
          </div>
          <div>
            <strong>TURF PLAY</strong>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`nav-item ${activeItem === item.label ? 'active' : ''}`}
              onClick={() => setActiveItem(item.label)}
            >
              <span className="nav-icon">
                <Icon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="note-card">
          <div className="note-title">
            <span className="note-icon">?</span>
            <strong>Note</strong>
          </div>
          <p>Advance booking strongly recommended for weekends.</p>
        </div>
      </aside>

      <section className="content-area">
        <header className="topbar">
          <div className="topbar__user">
            <span className="topbar__eyebrow">Signed in</span>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <div className="auth-actions">
            <Link to="/logout" className="ghost-button" state={{ user }}>
              <Icon name="login" />
              <span>Logout</span>
            </Link>
          </div>
        </header>

        <section className="hero-copy">
          <h1>Available Turfs</h1>
          <p>Choose your favorite turf and book your slot.</p>
        </section>

        <section className="turf-grid" aria-label="Available turfs">
          {turfs.map((turf) => (
            <TurfCard key={turf.name} turf={turf} />
          ))}
        </section>
      </section>
    </main>
  )
}

export default DashboardPage