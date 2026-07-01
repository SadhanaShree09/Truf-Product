import { useNavigate } from 'react-router-dom'
import AuthPanel from './AuthPanel.jsx'

const AUTH_STORAGE_KEY = 'turf-play-auth-user'

function LoginPage() {
  const navigate = useNavigate()

  function handleLoginSuccess(user) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    navigate('/dashboard', {
      replace: true,
      state: { user },
    })
  }

  return (
    <main className="auth-page">
      <section className="auth-page__panel">
        <AuthPanel onLoginSuccess={handleLoginSuccess} />
      </section>
    </main>
  )
}

export default LoginPage