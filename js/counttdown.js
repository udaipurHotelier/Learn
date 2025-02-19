// Key for localStorage
const STORAGE_KEY = 'user_online';

// Generate a unique ID for each visitor
const uniqueID = Date.now() + Math.random().toString(36).substring(2);

// Add the user to localStorage with an expiry time (e.g., 30 seconds)
function addUser() {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const now = Date.now();
  const updatedUsers = users.filter(user => user.expiry > now); // Filter out expired users

  // Add the current user
  updatedUsers.push({
    id: uniqueID,
    expiry: now + 30000 // User is active for 30 seconds
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  return updatedUsers;
}

// Count online users
function countUsers() {
  const now = Date.now();
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const updatedUsers = users.filter(user => user.expiry > now); // Filter out expired users
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  return updatedUsers.length;
}

// Update the count every second
function updateCount() {
  const userCountElement = document.getElementById('userCount');
  userCountElement.textContent = countUsers();
}

// Keep refreshing the user's presence every 15 seconds
function refreshUser() {
  addUser();
  setInterval(() => {
    addUser();
    updateCount();
  }, 15000);
}

// Initialize the counter and refresh mechanism
refreshUser();
updateCount();
