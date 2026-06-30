import { useState } from 'react'
import './App.css'

const sidebarItems = [
  { icon: 'home', label: 'Home' },
  { icon: 'calendar', label: 'Bookings' },
  { icon: 'clipboard', label: 'My Bookings' },
  { icon: 'heart', label: 'Favourites' },
  { icon: 'wallet', label: 'Wallet' },
  { icon: 'user', label: 'Profile' },
  { icon: 'headphones', label: 'Help & Support' },
]

const turfs = [
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
]

function App() {
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
            <button type="button" className="ghost-button">
              <Icon name="login" />
              <span>Login</span>
            </button>
            <button type="button" className="primary-button">
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

function TurfCard({ turf }) {
  return (
    <article className="turf-card">
      <div className={`turf-visual turf-${turf.style}`} aria-hidden="true">
        <div className="turf-glow" />
        <div className="turf-lights">
          <span />
          <span />
          <span />
        </div>
        <div className="turf-net turf-net-top" />
        <div className="turf-net turf-net-side" />
        <div className="turf-pitch" />
        <div className="turf-goal" />
      </div>

      <div className="turf-content">
        <div className="turf-heading-row">
          <h2>{turf.name}</h2>
        </div>

        <div className="turf-location-row">
          <div className="location">
            <span className="location-icon">
              <Icon name="pin" />
            </span>
            <span>{turf.location}</span>
          </div>
          <span className="distance">{turf.distance}</span>
        </div>

        <div className="turf-meta">
          <div className="badge badge-rating">
            <Icon name="star" />
            <span>{turf.rating}</span>
          </div>
          {turf.features.map((feature) => (
            <div className="badge" key={feature.label}>
              <Icon name={feature.icon} />
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        <div className="turf-footer">
          <div className="price">
            <strong>{turf.price}</strong>
            <span>/ hour</span>
          </div>
          <button type="button" className="detail-button">
            <span>View Details</span>
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </article>
  )
}

function Icon({ name }) {
  const shared = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
  }

  switch (name) {
    case 'home':
      return (
        <svg {...shared}>
          <path d="M4 11.5 12 4l8 7.5" />
          <path d="M6.5 10.5V20h11V10.5" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...shared}>
          <path d="M7 3v3M17 3v3M4.5 8.5h15" />
          <rect x="4.5" y="5.5" width="15" height="15" rx="2.5" />
          <path d="M8 12h3M8 16h3M13 12h3" />
        </svg>
      )
    case 'clipboard':
      return (
        <svg {...shared}>
          <rect x="6" y="4" width="12" height="16" rx="2.5" />
          <path d="M9 4.5h6" />
          <path d="M9 10h6M9 14h5" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...shared}>
          <path d="M12 20s-6.5-4.4-8.5-8.1C1.7 8.6 3.2 5.7 6.4 5.2c1.8-.3 3.4.5 4.4 1.9 1-1.4 2.6-2.2 4.4-1.9 3.2.5 4.7 3.4 2.9 6.7C18.5 15.6 12 20 12 20Z" />
        </svg>
      )
    case 'wallet':
      return (
        <svg {...shared}>
          <path d="M5.5 7h11.2a2.3 2.3 0 0 1 2.3 2.3V17a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V9A2 2 0 0 1 5.5 7Z" />
          <path d="M18.4 12.2H14a1.8 1.8 0 1 1 0-3.6h4.4" />
        </svg>
      )
    case 'user':
      return (
        <svg {...shared}>
          <path d="M20 19a8 8 0 0 0-16 0" />
          <circle cx="12" cy="8.5" r="3.5" />
        </svg>
      )
    case 'headphones':
      return (
        <svg {...shared}>
          <path d="M4.5 13a7.5 7.5 0 0 1 15 0" />
          <rect x="3.5" y="12.5" width="3" height="7" rx="1.2" />
          <rect x="17.5" y="12.5" width="3" height="7" rx="1.2" />
          <path d="M6.5 19.5a3 3 0 0 0 3 3" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...shared}>
          <path d="M12 21s6-6.1 6-11a6 6 0 1 0-12 0c0 4.9 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      )
    case 'star':
      return (
        <svg {...shared}>
          <path d="m12 3 2.4 5 5.6.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.8Z" />
        </svg>
      )
    case 'trophy':
      return (
        <svg {...shared}>
          <path d="M8 4h8v2a4 4 0 0 1-8 0V4Z" />
          <path d="M8 6H5.5A2.5 2.5 0 0 0 8 9.7M16 6h2.5A2.5 2.5 0 0 1 16 9.7" />
          <path d="M12 10.5V14M9 20h6M10.5 14h3l1 4.5h-5Z" />
        </svg>
      )
    case 'parking':
      return (
        <svg {...shared}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <path d="M10 17V7h3.5a2.5 2.5 0 0 1 0 5H10" />
        </svg>
      )
    case 'cricket':
      return (
        <svg {...shared}>
          <path d="M5 19c3-6.2 6.5-9.7 12.5-13.5" />
          <path d="M14.5 6.5 17 9" />
          <circle cx="18.2" cy="4.8" r="1.4" />
        </svg>
      )
    case 'indoor':
      return (
        <svg {...shared}>
          <path d="M4.5 20V9l7.5-5 7.5 5v11" />
          <path d="M9 20v-6h6v6" />
        </svg>
      )
    case 'changing':
      return (
        <svg {...shared}>
          <path d="M6 18.5V6.8l6-2.8 6 2.8v11.7" />
          <path d="M9 10.5h6M9 14h4" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...shared}>
          <path d="M5 12h12" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      )
    case 'login':
      return (
        <svg {...shared}>
          <path d="M10 7V5.5A2.5 2.5 0 0 1 12.5 3H18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5A2.5 2.5 0 0 1 10 18.5V17" />
          <path d="M3 12h11" />
          <path d="m11 8 4 4-4 4" />
        </svg>
      )
    case 'register':
      return (
        <svg {...shared}>
          <path d="M12 4v16M4 12h16" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
    default:
      return null
  }
}
export default App
