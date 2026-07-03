import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../shared/Icon.jsx'
import PublicSidebar from '../shared/PublicSidebar.jsx'
import TurfCard from './TurfCard.jsx'
import { createBooking, getBookings, getTurfById, getTurfs } from '../../services/authApi.js'

const FAV_KEY = 'turf-play-favourites'

function readLocalArray(key) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}

function writeLocalArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function normalizeTurf(turf) {
  return {
    ...turf,
    id: turf._id || turf.id || turf.name,
    image: turf.image || turf.images?.[0] || '',
    sports:
      turf.sports ||
      turf.features?.map((feature) => feature.label) ||
      turf.sportTypes ||
      [],
    pricePerHour: turf.pricePerHour || turf.price || 'N/A',
    availabilityStatus:
      turf.availabilityStatus || (turf.availableSlots?.length ? 'Available' : 'Limited'),
    availableSlots: turf.availableSlots || [],
    amenities: turf.amenities || [],
    description: turf.description || '',
    mapUrl: turf.mapUrl || '',
    reviews: turf.reviews || [],
  }
}

function PublicDashboard() {
  const [activeItem, setActiveItem] = useState('Home')
  const [turfs, setTurfs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('all')
  const [sportFilter, setSportFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [slotFilter, setSlotFilter] = useState('all')
  const [selectedTurf, setSelectedTurf] = useState(null)
  const [favourites, setFavourites] = useState(() => readLocalArray(FAV_KEY))
  const [bookings, setBookings] = useState([])
  const [bookingForm, setBookingForm] = useState({
    date: '',
    timeSlot: '',
    duration: 1,
    paymentMethod: 'UPI',
  })
  const [bookingStatus, setBookingStatus] = useState('')
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function fetchTurfs() {
      try {
        const response = await getTurfs()
        setTurfs((response.turfs || []).map(normalizeTurf))
      } catch (err) {
        setError(err.message)
        setTurfs([])
      } finally {
        setLoading(false)
      }
    }

    async function fetchBookings() {
      try {
        const response = await getBookings()
        setBookings(response.bookings || [])
      } catch {
        setBookings([])
      }
    }

    fetchTurfs()
    fetchBookings()
  }, [])

  useEffect(() => {
    writeLocalArray(FAV_KEY, favourites)
  }, [favourites])

  const cities = useMemo(() => {
    const list = new Set(turfs.map((turf) => turf.location?.split(',').at(-1)?.trim()).filter(Boolean))
    return ['all', ...list]
  }, [turfs])

  const sports = useMemo(() => {
    const values = new Set(turfs.flatMap((turf) => turf.sports || []))
    return ['all', ...values]
  }, [turfs])

  const slots = useMemo(() => {
    const values = new Set(turfs.flatMap((turf) => turf.availableSlots || []))
    return ['all', ...values]
  }, [turfs])

  const filteredTurfs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return turfs.filter((turf) => {
      const turfName = String(turf.name || '').toLowerCase()
      const location = String(turf.location || '').toLowerCase()
      const sportsText = (turf.sports || []).join(' ').toLowerCase()
      const ratingValue = Number(turf.rating || 0)
      const priceValue = Number(String(turf.pricePerHour || turf.price || '').replace(/[^0-9.]/g, ''))

      const bySearch =
        !query || turfName.includes(query) || location.includes(query) || sportsText.includes(query)
      const byCity = cityFilter === 'all' || location.includes(cityFilter.toLowerCase())
      const bySport =
        sportFilter === 'all' || (turf.sports || []).some((sport) => sport.toLowerCase() === sportFilter.toLowerCase())
      const byRating = ratingFilter === 'all' || ratingValue >= Number(ratingFilter)
      const byPrice =
        priceFilter === 'all' ||
        (priceFilter === 'lt1000' ? priceValue < 1000 : priceFilter === '1000-1500' ? priceValue >= 1000 && priceValue <= 1500 : priceValue > 1500)
      const bySlot = slotFilter === 'all' || (turf.availableSlots || []).includes(slotFilter)

      return bySearch && byCity && bySport && byRating && byPrice && bySlot
    })
  }, [turfs, search, cityFilter, sportFilter, ratingFilter, priceFilter, slotFilter])

  async function handleViewDetails(turf) {
    try {
      const hasObjectId = typeof turf.id === 'string' && turf.id.length === 24
      if (hasObjectId) {
        const response = await getTurfById(turf.id)
        setSelectedTurf(normalizeTurf(response.turf))
      } else {
        setSelectedTurf(turf)
      }
    } catch {
      setSelectedTurf(turf)
    }
  }

  function handleToggleFavourite(turf) {
    setFavourites((current) => {
      if (current.includes(turf.id)) {
        return current.filter((id) => id !== turf.id)
      }
      return [...current, turf.id]
    })
  }

  function handleQuickBook(turf) {
    setSelectedTurf(turf)
    setBookingForm((current) => ({
      ...current,
      timeSlot: turf.availableSlots?.[0] || '',
    }))
    setBookingStatus('')
  }

  async function handleBookingSubmit(event) {
    event.preventDefault()
    setBookingStatus('')

    if (!selectedTurf) return

    try {
      const amountValue = Number(String(selectedTurf.pricePerHour).replace(/[^0-9.]/g, '')) || 0
      const payload = {
        turfId: selectedTurf.id,
        turfName: selectedTurf.name,
        location: selectedTurf.location,
        date: bookingForm.date,
        timeSlot: bookingForm.timeSlot,
        duration: bookingForm.duration,
        paymentMethod: bookingForm.paymentMethod,
        amount: amountValue * Number(bookingForm.duration || 1),
      }

      const response = await createBooking(payload)
      setBookings((current) => [response.booking, ...current])
      setNotifications((current) => [
        `Booking confirmed: ${response.booking.bookingId}`,
        'Your booking starts in 30 minutes. Please arrive at Turf Arena.',
        ...current,
      ])
      setBookingStatus(`Booking confirmed. ID: ${response.booking.bookingId}`)
    } catch (err) {
      setBookingStatus(err.message)
    }
  }

  const favouriteTurfs = turfs.filter((turf) => favourites.includes(turf.id))
  const upcomingBookings = bookings.filter((booking) => booking.status === 'upcoming' || booking.status === 'confirmed')
  const completedBookings = bookings.filter((booking) => booking.status === 'completed')
  const cancelledBookings = bookings.filter((booking) => booking.status === 'cancelled')

  return (
    <main className="dashboard-shell">
      <PublicSidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <section className="content-area">
        <header className="topbar">
          <div className="topbar__user">
            <span className="topbar__eyebrow">Browse Turfs</span>
          </div>
          <div className="auth-actions">
            <Link to="/login" className="ghost-button">
              <Icon name="login" />
              <span>Login</span>
            </Link>
            <Link to="/login" className="ghost-button">
              <Icon name="user" />
              <span>Register</span>
            </Link>
          </div>
        </header>

        <section className="hero-copy">
          <h1>Available Turfs</h1>
          <p>Browse, search, filter and book your slot instantly without login.</p>
        </section>

        <section className="auth-panel" aria-label="Search and filter turfs">
          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            <label className="field">
              <span>Search by name, location, sport</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Football Turf / Chennai / Cricket"
              />
            </label>

            <div className="auth-row">
              <label className="field">
                <span>City</span>
                <select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)}>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Sport Type</span>
                <select value={sportFilter} onChange={(event) => setSportFilter(event.target.value)}>
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport === 'all' ? 'All Sports' : sport}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="auth-row">
              <label className="field">
                <span>Rating</span>
                <select value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value)}>
                  <option value="all">Any rating</option>
                  <option value="4">4.0+</option>
                  <option value="4.5">4.5+</option>
                </select>
              </label>

              <label className="field">
                <span>Price Range</span>
                <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
                  <option value="all">Any price</option>
                  <option value="lt1000">Below ₹1000</option>
                  <option value="1000-1500">₹1000 - ₹1500</option>
                  <option value="gt1500">Above ₹1500</option>
                </select>
              </label>

              <label className="field">
                <span>Available Slot</span>
                <select value={slotFilter} onChange={(event) => setSlotFilter(event.target.value)}>
                  {slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot === 'all' ? 'Any slot' : slot}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </form>
        </section>

        <section className="turf-grid" aria-label="Available turfs">
          {loading ? (
            <p>Loading turfs...</p>
          ) : error ? (
            <p>Error loading turfs</p>
          ) : filteredTurfs.length === 0 ? (
            <p>No turfs available</p>
          ) : (
            filteredTurfs.map((turf) => (
              <TurfCard
                key={turf.id}
                turf={turf}
                isFavourite={favourites.includes(turf.id)}
                onToggleFavourite={handleToggleFavourite}
                onViewDetails={handleViewDetails}
                onQuickBook={handleQuickBook}
              />
            ))
          )}
        </section>

        <section className="auth-panel" aria-label="Favourite grounds">
          <h2>Favourite Grounds</h2>
          {favouriteTurfs.length === 0 ? (
            <p>No favourites yet. Click Save on any turf card.</p>
          ) : (
            <ul>
              {favouriteTurfs.map((turf) => (
                <li key={turf.id}>{turf.name} - {turf.location}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="auth-panel" aria-label="Booking history">
          <h2>Booking History</h2>
          <p>Upcoming: {upcomingBookings.length} | Completed: {completedBookings.length} | Cancelled: {cancelledBookings.length}</p>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul>
              {bookings.slice(0, 8).map((booking) => (
                <li key={booking.bookingId}>
                  {booking.bookingId} - {booking.turfName} - {booking.date} {booking.timeSlot} ({booking.status})
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="auth-panel" aria-label="Notifications and reminders">
          <h2>Notifications & Reminders</h2>
          {notifications.length === 0 ? (
            <p>No notifications yet.</p>
          ) : (
            <ul>
              {notifications.slice(0, 6).map((note, index) => (
                <li key={`${note}-${index}`}>{note}</li>
              ))}
            </ul>
          )}
        </section>

        {selectedTurf && (
          <section className="auth-panel" aria-label="Turf details and booking">
            <h2>{selectedTurf.name}</h2>
            <p>{selectedTurf.description}</p>
            <p><strong>Address:</strong> {selectedTurf.location}</p>
            <p><strong>Sports:</strong> {(selectedTurf.sports || []).join(', ') || 'N/A'}</p>
            <p><strong>Amenities:</strong> {(selectedTurf.amenities || []).join(', ')}</p>
            <p><strong>Price per hour:</strong> {selectedTurf.pricePerHour}</p>

            {selectedTurf.mapUrl && (
              <p>
                <a href={selectedTurf.mapUrl} target="_blank" rel="noreferrer" className="ghost-button">
                  Open Google Maps
                </a>
              </p>
            )}

            <form className="auth-form" onSubmit={handleBookingSubmit}>
              <div className="auth-row">
                <label className="field">
                  <span>Date</span>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(event) => setBookingForm((current) => ({ ...current, date: event.target.value }))}
                  />
                </label>

                <label className="field">
                  <span>Time Slot</span>
                  <select
                    required
                    value={bookingForm.timeSlot}
                    onChange={(event) => setBookingForm((current) => ({ ...current, timeSlot: event.target.value }))}
                  >
                    <option value="">Select Slot</option>
                    {(selectedTurf.availableSlots || []).map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Duration (hours)</span>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={bookingForm.duration}
                    onChange={(event) => setBookingForm((current) => ({ ...current, duration: event.target.value }))}
                  />
                </label>
              </div>

              <div className="auth-row">
                <label className="field">
                  <span>Payment Method</span>
                  <select
                    value={bookingForm.paymentMethod}
                    onChange={(event) => setBookingForm((current) => ({ ...current, paymentMethod: event.target.value }))}
                  >
                    <option value="UPI">UPI Payment</option>
                    <option value="QR">QR Code Payment</option>
                  </select>
                </label>
              </div>

              <button type="submit" className="primary-button">Proceed to Payment</button>
            </form>

            {bookingStatus && <p>{bookingStatus}</p>}
          </section>
        )}
      </section>
    </main>
  )
}

export default PublicDashboard
