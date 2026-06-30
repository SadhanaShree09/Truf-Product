const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

async function request(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export function loginUser(payload) {
  return request('/api/auth/login', payload)
}

export function registerUser(payload) {
  return request('/api/auth/register', payload)
}
