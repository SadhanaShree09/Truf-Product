import { useState, useEffect } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import Icon from '../shared/Icon.jsx'
import AdminSidebar from '../shared/AdminSidebar.jsx'
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

function AdminDashboard() {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [turfs, setTurfs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()
  const user = location.state?.user || readStoredUser()

  if (!user || user.role !== 'admin') {
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
      <AdminSidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <section className="content-area">
        <header className="topbar">
          <div className="topbar__user">
            <span className="topbar__eyebrow">Admin Panel</span>
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

        {activeItem === 'Dashboard' && (
          <>
            <section className="hero-copy">
              <h1>Admin Dashboard</h1>
              <p>Manage all turfs, users, and bookings</p>
            </section>

            <section className="turf-grid" aria-label="All turfs">
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
          </>
        )}

        {activeItem === 'Manage Turfs' && (
          <section className="hero-copy">
            <h1>Manage Turfs</h1>
            <p>Add, edit, or remove turfs</p>
          </section>
        )}

        {activeItem === 'Bookings' && (
          <section className="hero-copy">
            <h1>Bookings</h1>
            <p>View all bookings and manage them</p>
          </section>
        )}

        {activeItem === 'Users' && (
          <section className="hero-copy">
            <h1>Users</h1>
            <p>Manage users and their access</p>
          </section>
        )}

        {activeItem === 'Reports' && (
          <section className="hero-copy">
            <h1>Reports</h1>
            <p>View analytics and reports</p>
          </section>
        )}

        {activeItem === 'Settings' && (
          <section className="hero-copy">
            <h1>Settings</h1>
            <p>Configure system settings</p>
          </section>
        )}
      </section>
    </main>
  )
}

export default AdminDashboard
