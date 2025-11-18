import ActivityCard from './ActivityCard';

function ActivitiesList({ activities, loading, error, onUnregister }) {
  if (loading) {
    return (
      <section id="activities-container">
        <h3>Available Activities</h3>
        <div id="activities-list">
          <p>Loading activities...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="activities-container">
        <h3>Available Activities</h3>
        <div id="activities-list">
          <p>Failed to load activities. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="activities-container">
      <h3>Available Activities</h3>
      <div id="activities-list">
        {Object.entries(activities).map(([name, details]) => (
          <ActivityCard
            key={name}
            name={name}
            details={details}
            onUnregister={onUnregister}
          />
        ))}
      </div>
    </section>
  );
}

export default ActivitiesList;
