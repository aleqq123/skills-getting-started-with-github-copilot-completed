import { useState } from 'react';
import MessageDisplay from './MessageDisplay';

function SignupForm({ activities, onSignup }) {
  const [email, setEmail] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await onSignup(selectedActivity, email);
      
      // Show success message
      setMessage('Successfully signed up!');
      setMessageType('success');
      
      // Reset form
      setEmail('');
      setSelectedActivity('');
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    } catch (error) {
      setMessage(error.message || 'Failed to sign up. Please try again.');
      setMessageType('error');
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  return (
    <section id="signup-container">
      <h3>Sign Up for an Activity</h3>
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Student Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your-email@mergington.edu"
          />
        </div>
        <div className="form-group">
          <label htmlFor="activity">Select Activity:</label>
          <select
            id="activity"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            required
          >
            <option value="">-- Select an activity --</option>
            {Object.keys(activities).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <MessageDisplay message={message} type={messageType} />
    </section>
  );
}

export default SignupForm;
