import Icon from '../shared/Icon.jsx'

const PUBLIC_SIDEBAR_ITEMS = [
  { icon: 'home', label: 'Home' },
  { icon: 'heart', label: 'Favourites' },
  { icon: 'headphones', label: 'Help & Support' },
]

function PublicSidebar({ activeItem, setActiveItem }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span>⚽</span>
        </div>
        <div>
          <strong>TURF PLAY</strong>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary">
        {PUBLIC_SIDEBAR_ITEMS.map((item) => (
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
        <p>Sign up to book your favorite turfs instantly.</p>
      </div>
    </aside>
  )
}

export default PublicSidebar
