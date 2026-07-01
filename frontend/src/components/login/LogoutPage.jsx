import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const AUTH_STORAGE_KEY = 'turf-play-auth-user'

function readStoredUser() {
  try {
    const rawUser = sessionStorage.getItem(AUTH_STORAGE_KEY)
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    return null
  }
}

function LogoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = location.state?.user || readStoredUser()

  function handleCancel() {
    navigate('/dashboard', { replace: true, state: user ? { user } : undefined })
  }

  function handleConfirm() {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    navigate('/login', { replace: true })
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <main className="auth-page logout-page">
      <section className="auth-page__panel">
        <div className="logout-card">
          <p className="auth-panel__eyebrow">Confirm action</p>
          <h2>Log out of your account?</h2>
          <p className="logout-card__copy">
            You are signed in as <strong>{user.name}</strong> ({user.email}).
          </p>
          <div className="logout-card__actions">
            <button type="button" className="ghost-button" onClick={handleCancel}>
              Stay logged in
            </button>
            <button type="button" className="primary-button" onClick={handleConfirm}>
              Confirm logout
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LogoutPage