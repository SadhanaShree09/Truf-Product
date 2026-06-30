import { useState } from 'react'
import Icon from './Icon.jsx'
import TurfCard from './TurfCard.jsx'
import { sidebarItems, turfs } from '../data/dashboard.js'

function DashboardPage({ onAuthRequest }) {
  const [activeItem, setActiveItem] = useState('Home')

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span>⚽</span>
          </div>
          <div>
            <strong>TRUF PLAY</strong>
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
          <div className="spacer" aria-hidden="true" />
          <div className="auth-actions">
            <button type="button" className="ghost-button" onClick={() => onAuthRequest('login')}>
              <Icon name="login" />
              <span>Login</span>
            </button>
            <button type="button" className="primary-button" onClick={() => onAuthRequest('register')}>
              <Icon name="register" />
              <span>Register</span>
            </button>
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
