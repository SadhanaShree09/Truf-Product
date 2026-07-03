import Icon from '../shared/Icon.jsx'

const ADMIN_SIDEBAR_ITEMS = [
  { icon: 'home', label: 'Dashboard' },
  { icon: 'building', label: 'Manage Turfs' },
  { icon: 'calendar', label: 'Bookings' },
  { icon: 'users', label: 'Users' },
  { icon: 'clipboard', label: 'Reports' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'headphones', label: 'Support' },
]

function AdminSidebar({ activeItem, setActiveItem }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span>⚽</span>
        </div>
        <div>
          <strong>TURF PLAY - ADMIN</strong>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary">
        {ADMIN_SIDEBAR_ITEMS.map((item) => (
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
          <span className="note-icon">⚙️</span>
          <strong>Admin Panel</strong>
        </div>
        <p>Manage all turfs, users, and bookings from here.</p>
      </div>
    </aside>
  )
}

export default AdminSidebar
