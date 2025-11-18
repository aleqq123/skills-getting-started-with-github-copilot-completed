import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ActivitiesList from './components/ActivitiesList';
import SignupForm from './components/SignupForm';
import { fetchActivities, signupForActivity, unregisterFromActivity } from './api';

function App() {
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load activities on mount
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchActivities();
      setActivities(data);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (activityName, email) => {
    const result = await signupForActivity(activityName, email);
    // Refresh activities list after signup
    await loadActivities();
    return result;
  };

  const handleUnregister = async (activityName, email) => {
    try {
      await unregisterFromActivity(activityName, email);
      // Refresh activities list after unregistering
      await loadActivities();
    } catch (err) {
      console.error('Error unregistering:', err);
      alert(err.message || 'Failed to unregister');
    }
  };

  return (
    <>
      <Header />
      <main>
        <ActivitiesList
          activities={activities}
          loading={loading}
          error={error}
          onUnregister={handleUnregister}
        />
        <SignupForm
          activities={activities}
          onSignup={handleSignup}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
