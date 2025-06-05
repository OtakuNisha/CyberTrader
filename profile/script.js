// Common JavaScript for profile pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('quantumUser'));
    if (!userData && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
    
    // Common functionality can go here
});
