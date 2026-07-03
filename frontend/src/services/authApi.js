const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

async function request(path, payload, method = 'POST') {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method === 'GET' ? undefined : JSON.stringify(payload),
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

export function getTurfs() {
  return request('/api/turfs', null, 'GET')
}

export function getTurfById(turfId) {
  return request(`/api/turfs/${turfId}`, null, 'GET')
}

export function createBooking(payload) {
  return request('/api/bookings', payload)
}

export function getBookings() {
  return request('/api/bookings', null, 'GET')
}
