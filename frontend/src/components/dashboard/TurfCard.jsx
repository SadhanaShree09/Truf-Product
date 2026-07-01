import Icon from '../shared/Icon.jsx'

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

export default TurfCard