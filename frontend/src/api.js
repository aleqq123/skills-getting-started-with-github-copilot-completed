/**
 * API utilities for interacting with FastAPI backend
 * Base URL is handled by Vite proxy in dev, or can be configured for production
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetch all activities from the API
 * @returns {Promise<Object>} Activities object with activity names as keys
 */
export async function fetchActivities() {
  const response = await fetch(`${API_BASE_URL}/activities`);
  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }
  return await response.json();
}

/**
 * Sign up a student for an activity
 * @param {string} activityName - Name of the activity
 * @param {string} email - Student's email address
 * @returns {Promise<Object>} Response object with message
 */
export async function signupForActivity(activityName, email) {
  const response = await fetch(
    `${API_BASE_URL}/activities/${encodeURIComponent(activityName)}/signup?email=${encodeURIComponent(email)}`,
    {
      method: 'POST',
    }
  );
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.detail || 'Failed to sign up');
  }
  
  return result;
}

/**
 * Unregister a student from an activity
 * @param {string} activityName - Name of the activity
 * @param {string} email - Student's email address
 * @returns {Promise<Object>} Response object with message
 */
export async function unregisterFromActivity(activityName, email) {
  const response = await fetch(
    `${API_BASE_URL}/activities/${encodeURIComponent(activityName)}/unregister?email=${encodeURIComponent(email)}`,
    {
      method: 'DELETE',
    }
  );
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.detail || 'Failed to unregister');
  }
  
  return result;
}
