// Database simulation using localStorage
const DB_NAME = 'cyberTraderUsers';

// Initialize empty database if it doesn't exist
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

// Authenticate user
function authenticateUser(email, password) {
    const user = getUserByEmail(email);
    if (user && user.password === password) {
        return {
            email: user.email,
            username: user.username,
            profilePic: user.profilePic,
            watchedStocks: user.watchedStocks,
            portfolio: user.portfolio
        };
    }
    return null;
}

// Initialize database on load
initDB();
