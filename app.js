                                                                                                                                                                                                                                                                                                        // Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signupLink = document.getElementById('signup-link');

    // Login Button Event Listener
    loginBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation
        if (email === '' || password === '') {
            alert('Please enter both email and password');
            return;
        }

        // Mock login - in a real app, you would call an authentication API
        // For demo purposes, we'll just redirect to the preferences page
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'preferences.html';
    });

    // Signup Link Event Listener
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Signup functionality will be implemented soon!');
    });
}); 