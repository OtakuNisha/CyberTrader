// auth.js - User Authentication System

// Store users in localStorage for persistence
const users = JSON.parse(localStorage.getItem('cybertrader_users')) || [];

// Current user session
let currentUser = JSON.parse(sessionStorage.getItem('cybertrader_currentUser')) || null;

// Register a new user
function registerUser(username, email, password) {
    // Validate input
    if (!username || !email || !password) {
        return { success: false, message: 'All fields are required' };
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: 'Email already registered' };
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // Note: In production, you should hash passwords!
        portfolio: [],
        balance: 10000, // Starting balance
        createdAt: new Date().toISOString(),
        watchedStocks: ['AAPL', 'TSLA', 'NVDA'] // Default watchlist
    };

    // Add to users array
    users.push(newUser);
    localStorage.setItem('cybertrader_users', JSON.stringify(users));

    // Automatically log in the new user
    return loginUser(email, password);
}

// Login user
function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    
    if (!user) {
        return { success: false, message: 'Invalid email or password' };
    }

    // Set current user
    currentUser = user;
    sessionStorage.setItem('cybertrader_currentUser', JSON.stringify(user));
    
    return { success: true, user };
}

// Logout user
function logoutUser() {
    currentUser = null;
    sessionStorage.removeItem('cybertrader_currentUser');
    window.location.href = 'login.html';
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Update user data
function updateUser(updatedUser) {
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem('cybertrader_users', JSON.stringify(users));
        
        // Update session if it's the current user
        if (currentUser && currentUser.id === updatedUser.id) {
            currentUser = updatedUser;
            sessionStorage.setItem('cybertrader_currentUser', JSON.stringify(updatedUser));
        }
        return true;
    }
    return false;
}

// Helper function to get user by email
function getUserByEmail(email) {
    return users.find(user => user.email === email);
}
