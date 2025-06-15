// Database simulation using localStorage
const DB_NAME = 'cyberTraderUsers';

// Initialize database if it doesn't exist
function initDB() {
    if (!localStorage.getItem(DB_NAME)) {
        localStorage.setItem(DB_NAME, JSON.stringify([]));
    }
}

// Get all users
function getAllUsers() {
    initDB();
    return JSON.parse(localStorage.getItem(DB_NAME));
}

// Get user by email
function getUserByEmail(email) {
    const users = getAllUsers();
    return users.find(user => user.email === email);
}

// Create a new user
function createUser(user) {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem(DB_NAME, JSON.stringify(users));
}

// Authenticate user
function authenticateUser(email, password) {
    const user = getUserByEmail(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
}

// Check if user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

// Logout user
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Initialize database on load
initDB();
