// Initialize users from localStorage
let users = JSON.parse(localStorage.getItem('users')) || {};

// Show error message
function showError(message, page = 'signup') {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

// Show success message
function showSuccess(message, page = 'signup') {
    const successElement = document.getElementById('successMessage');
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        if (page === 'signup') {
            setTimeout(() => {
                successElement.style.display = 'none';
                window.location.href = 'login.html';
            }, 2000);
        }
    }
}

// Create a new user
function createUser(user) {
    const { email, password } = user;
    const hashedPassword = CryptoJS.SHA256(password).toString();
    users[email.toLowerCase()] = {
        ...user,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        watchedStocks: user.watchedStocks || [],
        portfolio: user.portfolio || {}
    };
    localStorage.setItem('users', JSON.stringify(users));
}

// Get user by email
function getUserByEmail(email) {
    return users[email.toLowerCase()] || null;
}

// Authenticate user
function authenticateUser(email, password) {
    const user = getUserByEmail(email);
    if (!user) return null;
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword === user.password ? user : null;
}

// Logout user
function logoutUser() {
    localStorage.removeItem('CyberUser');
}

// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('CyberUser');
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('CyberUser'));
}

// Signup handler
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Password strength validation
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
            if (!passwordRegex.test(password)) {
                showError('Password must be at least 8 characters long and include a number and a special character.');
                return;
            }

            if (password !== confirmPassword) {
                showError('Passwords do not match.');
                return;
            }

            if (getUserByEmail(email)) {
                showError('Email already registered.');
                return;
            }

            const newUser = {
                username,
                email,
                password,
                watchedStocks: [],
                portfolio: {}
            };

            createUser(newUser);
            showSuccess('Account created successfully! Redirecting to login...');
        });
    }

    // Login handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;

            const user = authenticateUser(email, password);
            if (user) {
                user.watchedStocks = user.watchedStocks || ['AAPL', 'TSLA', 'NVDA'];
                user.portfolio = user.portfolio || {};
                localStorage.setItem('CyberUser', JSON.stringify(user));
                const redirectUrl = localStorage.getItem('redirectUrl') || 'profile.html';
                localStorage.removeItem('redirectUrl');
                window.location.href = redirectUrl;
            } else {
                showError('Authentication failed. Please check your credentials.', 'login');
            }
        });
    }

    // Password reset handler
    const forgotPassword = document.getElementById('forgotPassword');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const resetModal = document.getElementById('resetModal');
            const resetEmail = document.getElementById('resetEmail');
            resetModal.style.display = 'flex';
            resetEmail.value = document.getElementById('email')?.value || '';
        });
    }

    const sendResetLink = document.getElementById('sendResetLink');
    if (sendResetLink) {
        sendResetLink.addEventListener('click', () => {
            const email = document.getElementById('resetEmail').value.trim().toLowerCase();
            const statusElement = document.getElementById('resetStatus');
            if (email) {
                statusElement.innerHTML = `
                    <p>If an account exists for ${email}, you will receive password reset instructions shortly.</p>
                    <p>Please check your email inbox (simulated - requires backend for actual email).</p>
                `;
            } else {
                statusElement.innerHTML = `<p>Please enter a valid email address.</p>`;
            }
        });
    }

    const closeResetModal = document.getElementById('closeResetModal');
    if (closeResetModal) {
        closeResetModal.addEventListener('click', () => {
            document.getElementById('resetModal').style.display = 'none';
        });
    }
});
