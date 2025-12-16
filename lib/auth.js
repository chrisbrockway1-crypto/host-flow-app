// /lib/auth.js
// PLACEHOLDER: In a real app, this would fetch session data from a server endpoint

const MOCK_USER = {
  id: 1,
  email: 'host@example.com',
  name: 'Alex Host',
  // In a real app, this would come from the DB/Stripe webhook
  is_subscribed: true 
}; 

/**
 * Mocks fetching the current authenticated user object.
 */
export async function getCurrentUser() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50)); 
  // For now, we return a hardcoded user to proceed with development
  return MOCK_USER; 
}

/**
 * Checks if a user session exists.
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * Checks if the user is both authenticated AND subscribed.
 */
export async function isSubscribed() {
  const user = await getCurrentUser();
  return !!user && user.is_subscribed;
}

// In a real application, you would also export signIn and signOut functions.