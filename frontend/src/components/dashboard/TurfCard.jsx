import Icon from '../shared/Icon.jsx'

function TurfCard({ turf, isFavourite = false, onToggleFavourite, onViewDetails, onQuickBook }) {
  const sports = turf.sports?.length ? turf.sports : turf.features?.map((feature) => feature.label) || []
  const availability = turf.availabilityStatus || (turf.availableSlots?.length ? 'Available' : 'Limited')

  return (
    <article className="turf-card">
      <div className={`turf-visual turf-${turf.style || 'a'}`} aria-hidden="true">
        {turf.image ? (
          <img src={turf.image} alt={turf.name} className="turf-image" loading="lazy" />
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="turf-content">
        <div className="turf-heading-row">
          <h2>{turf.name}</h2>
          <button type="button" className="ghost-button" onClick={() => onToggleFavourite?.(turf)}>
            <Icon name="heart" />
            <span>{isFavourite ? 'Saved' : 'Save'}</span>
          </button>
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
            <span>{turf.rating || 'N/A'}</span>
          </div>
          <div className="badge">
            <span>{availability}</span>
          </div>
          {sports.slice(0, 3).map((sport) => (
            <div className="badge" key={sport}>
              <Icon name="trophy" />
              <span>{sport}</span>
            </div>
          ))}
        </div>

        <div className="turf-footer">
          <div className="price">
            <strong>{turf.pricePerHour || turf.price || 'N/A'}</strong>
            <span>/ hour</span>
          </div>
          <button type="button" className="detail-button" onClick={() => onViewDetails?.(turf)}>
            <span>View Details</span>
            <Icon name="arrow" />
          </button>
          <button type="button" className="primary-button" onClick={() => onQuickBook?.(turf)}>
            <span>Quick Book</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default TurfCard