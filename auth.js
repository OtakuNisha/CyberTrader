// auth.js - Authentication helper functions

// Simple user database (in a real app, this would be server-side)
const users = [
    {
        email: "user@example.com",
        password: "password123",
        username: "CyberTrader",
        profilePic: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        watchedStocks: ["AAPL", "TSLA", "NVDA"],
        portfolio: {
            value: 25384.92,
            invested: 15421.00,
            profit: 9963.92
        }
    }
];

// Authenticate user
function authenticateUser(email, password) {
    return users.find(user => user.email === email && user.password === password);
}

// Get current user from localStorage
function getCurrentUser() {
    const userData = localStorage.getItem('CyberUser');
    return userData ? JSON.parse(userData) : null;
}

// In a real application, you would have server-side authentication
// This is just for demonstration purposes
