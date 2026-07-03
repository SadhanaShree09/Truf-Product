import { useEffect, useState } from 'react'
import { loginUser, registerUser } from '../../services/authApi.js'

function AuthPanel({ mode = 'login', onModeChange, onLoginSuccess }) {
  const [activeMode, setActiveMode] = useState(mode)
  const [form, setForm] = useState({ name: '', username: '', email: '', identifier: '', password: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setActiveMode(mode)
  }, [mode])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      if (activeMode === 'register') {
        const response = await registerUser({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
        })
        setStatus(response.message || 'Account created successfully.')
        setForm((current) => ({ ...current, password: '', identifier: form.username || form.email }))
        setActiveMode('login')
        onModeChange?.('login')
        return
      }

      const response = await loginUser({
        identifier: form.identifier,
        password: form.password,
      })
      setStatus(`Welcome back, ${response.user?.name || 'player'}.`)
      onLoginSuccess?.(response.user)
    } catch (error) {
      setStatus(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-panel" aria-labelledby="auth-panel-title" id="auth-panel">
      <div className="auth-panel__header">
        <div>
          <p className="auth-panel__eyebrow">Secure access</p>
          <h2 id="auth-panel-title">Login or create an account</h2>
        </div>
        <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            className={`auth-tab ${activeMode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveMode('login')
              onModeChange?.('login')
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tab ${activeMode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveMode('register')
              onModeChange?.('register')
            }}
          >
            Register
          </button>
        </div>
      </div>

      <p className="auth-panel__copy">
        The frontend now talks to the backend auth API, which stores users in a dedicated MongoDB database.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {activeMode === 'register' && (
          <>
            <label className="field">
              <span>Name</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={updateField}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>

            <label className="field">
              <span>Username</span>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={updateField}
                placeholder="Choose a username"
                autoComplete="username"
                required
              />
            </label>
          </>
        )}

        {activeMode === 'login' ? (
          <label className="field">
            <span>Username or Email</span>
            <input
              name="identifier"
              type="text"
              value={form.identifier}
              onChange={updateField}
              placeholder="username or you@example.com"
              autoComplete="username"
              required
            />
          </label>
        ) : (
          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>
        )}

        <label className="field">
          <span>Password</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            placeholder="Enter password"
            autoComplete={activeMode === 'register' ? 'new-password' : 'current-password'}
            minLength={6}
            required
          />
        </label>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Please wait...' : activeMode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>

      <div className="auth-status" aria-live="polite">
        {status || 'Use the form to connect to the auth API on localhost:4000.'}
      </div>
    </section>
  )
}

export default AuthPanel
