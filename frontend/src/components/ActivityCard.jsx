function ActivityCard({ name, details, onUnregister }) {
  const spotsLeft = details.max_participants - details.participants.length;

  const handleDelete = (email) => {
    if (window.confirm(`Are you sure you want to unregister ${email} from ${name}?`)) {
      onUnregister(name, email);
    }
  };

  return (
    <div className="activity-card">
      <h4>{name}</h4>
      <p>{details.description}</p>
      <p><strong>Schedule:</strong> {details.schedule}</p>
      <p><strong>Availability:</strong> {spotsLeft} spots left</p>
      
      <div className="participants-section">
        <strong>Participants:</strong>
        {details.participants.length > 0 ? (
          <ul className="participants-list">
            {details.participants.map((email, index) => (
              <li key={index}>
                <span>{email}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(email)}
                  title="Remove participant"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-participants">No participants yet.</p>
        )}
      </div>
    </div>
  );
}

export default ActivityCard;
