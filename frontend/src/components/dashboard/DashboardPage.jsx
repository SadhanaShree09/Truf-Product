import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Icon from '../shared/Icon.jsx'
import TurfCard from './TurfCard.jsx'
import { getTurfs } from '../../services/authApi.js'

const AUTH_STORAGE_KEY = 'turf-play-auth-user'

const SIDEBAR_ITEMS = [
  { icon: 'home', label: 'Home' },
  { icon: 'calendar', label: 'Bookings' },
  { icon: 'clipboard', label: 'My Bookings' },
  { icon: 'heart', label: 'Favourites' },
  { icon: 'wallet', label: 'Wallet' },
  { icon: 'user', label: 'Profile' },
  { icon: 'headphones', label: 'Help & Support' },
]

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
  const [turfs, setTurfs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()
  const user = location.state?.user || readStoredUser()

  useEffect(() => {
    async function fetchTurfs() {
      try {
        const response = await getTurfs()
        setTurfs(response.turfs || [])
      } catch (err) {
        setError(err.message)
        // Fallback to demo data if API fails
        setTurfs([
          {
            name: 'Turf A',
            location: 'HSR Layout, Bangalore',
            distance: '2.4 km away',
            rating: '4.8',
            price: '₹1200',
            features: [
              { icon: 'trophy', label: 'Football' },
              { icon: 'trophy', label: 'FIFA Turf' },
              { icon: 'parking', label: 'Parking' },
            ],
            style: 'a',
          },
          {
            name: 'Turf B',
            location: 'Koramangala, Bangalore',
            distance: '3.7 km away',
            rating: '4.6',
            price: '₹1000',
            features: [
              { icon: 'cricket', label: 'Cricket' },
              { icon: 'indoor', label: 'Indoor Turf' },
              { icon: 'changing', label: 'Changing Room' },
            ],
            style: 'b',
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchTurfs()
  }, [])

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
          {SIDEBAR_ITEMS.map((item) => (
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
            {user ? (
              <>
                <span className="topbar__eyebrow">Signed in</span>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </>
            ) : (
              <span className="topbar__eyebrow">Not signed in</span>
            )}
          </div>
          <div className="auth-actions">
            {user ? (
              <Link to="/logout" className="ghost-button" state={{ user }}>
                <Icon name="login" />
                <span>Logout</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="ghost-button">
                  <Icon name="login" />
                  <span>Login</span>
                </Link>
                <Link to="/login" className="ghost-button">
                  <Icon name="user" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </header>

        <section className="hero-copy">
          <h1>Available Turfs</h1>
          <p>Choose your favorite turf and book your slot.</p>
        </section>

        <section className="turf-grid" aria-label="Available turfs">
          {loading ? (
            <p>Loading turfs...</p>
          ) : error ? (
            <p>Error loading turfs (showing demo data)</p>
          ) : turfs.length === 0 ? (
            <p>No turfs available</p>
          ) : (
            turfs.map((turf) => (
              <TurfCard key={turf.name} turf={turf} />
            ))
          )}
        </section>
      </section>
    </main>
  )
}

export default DashboardPage