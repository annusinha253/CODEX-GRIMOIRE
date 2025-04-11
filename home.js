document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
        return;
    }

    // DOM Elements
    const arBtn = document.getElementById('ar-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // AR Button Event Listener
    arBtn.addEventListener('click', function() {
        // In a real app, this would launch the AR experience
        alert('AR functionality would be implemented here in a production app.\n\nThis would typically use WebXR or a device camera API to provide an augmented reality experience.');
    });

    // Logout Button Event Listener
    logoutBtn.addEventListener('click', function() {
        // Clear user data from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userPreferences');
        
        // Redirect to login page
        window.location.href = 'index.html';
    });

    // Check if user has set preferences
    const userPreferences = localStorage.getItem('userPreferences');
    if (userPreferences) {
        // Parse user preferences
        const preferences = JSON.parse(userPreferences);
        
        // Example of using preferences to customize content (in a real app)
        console.log('User preferences loaded:', preferences);
        
        // You could use these preferences to customize the UI
        // For example, if they're interested in history, show more historical content
        if (preferences.interests.history) {
            console.log('User is interested in history');
        }
        
        // Apply accessibility settings
        if (preferences.accessibility.highContrast) {
            // In a real app, you would apply high contrast styles
            console.log('High contrast mode would be enabled');
        }
    }
}); 