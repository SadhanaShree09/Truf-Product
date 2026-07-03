import { useState, useEffect } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import Icon from '../shared/Icon.jsx'
import UserSidebar from '../shared/UserSidebar.jsx'
import TurfCard from './TurfCard.jsx'
import { getTurfs } from '../../services/authApi.js'

const AUTH_STORAGE_KEY = 'turf-play-auth-user'

function readStoredUser() {
  try {
    const rawUser = sessionStorage.getItem(AUTH_STORAGE_KEY)
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    return null
  }
}

function UserDashboard() {
  const [activeItem, setActiveItem] = useState('Home')
  const [turfs, setTurfs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()
  const user = location.state?.user || readStoredUser()

  if (!user || user.role !== 'user') {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    async function fetchTurfs() {
      try {
        const response = await getTurfs()
        setTurfs(response.turfs || [])
      } catch (err) {
        setError(err.message)
        setTurfs([])
      } finally {
        setLoading(false)
      }
    }
    fetchTurfs()
  }, [])

  return (
    <main className="dashboard-shell">
      <UserSidebar activeItem={activeItem} setActiveItem={setActiveItem} />

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
          {loading ? (
            <p>Loading turfs...</p>
          ) : error ? (
            <p>Error loading turfs</p>
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

export default UserDashboard
