document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
        return;
    }

    // DOM Elements
    const saveBtn = document.getElementById('save-btn');
    
    // Interest checkboxes
    const historyCheckbox = document.getElementById('history');
    const architectureCheckbox = document.getElementById('architecture');
    const artCheckbox = document.getElementById('art');
    const cultureCheckbox = document.getElementById('culture');
    const foodCheckbox = document.getElementById('food');
    
    // Accessibility checkboxes
    const audioGuideCheckbox = document.getElementById('audioGuide');
    const textToSpeechCheckbox = document.getElementById('textToSpeech');
    const highContrastCheckbox = document.getElementById('highContrast');
    
    // Notification checkboxes
    const nearbyCheckbox = document.getElementById('nearby');
    const updatesCheckbox = document.getElementById('updates');
    const communityCheckbox = document.getElementById('community');
    
    // Load saved preferences if they exist
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        
        // Set interests
        historyCheckbox.checked = preferences.interests.history;
        architectureCheckbox.checked = preferences.interests.architecture;
        artCheckbox.checked = preferences.interests.art;
        cultureCheckbox.checked = preferences.interests.culture;
        foodCheckbox.checked = preferences.interests.food;
        
        // Set accessibility
        audioGuideCheckbox.checked = preferences.accessibility.audioGuide;
        textToSpeechCheckbox.checked = preferences.accessibility.textToSpeech;
        highContrastCheckbox.checked = preferences.accessibility.highContrast;
        
        // Set notifications
        nearbyCheckbox.checked = preferences.notifications.nearby;
        updatesCheckbox.checked = preferences.notifications.updates;
        communityCheckbox.checked = preferences.notifications.community;
    }
    
    // Save Button Event Listener
    saveBtn.addEventListener('click', function() {
        // Gather all preferences
        const preferences = {
            interests: {
                history: historyCheckbox.checked,
                architecture: architectureCheckbox.checked,
                art: artCheckbox.checked,
                culture: cultureCheckbox.checked,
                food: foodCheckbox.checked
            },
            accessibility: {
                audioGuide: audioGuideCheckbox.checked,
                textToSpeech: textToSpeechCheckbox.checked,
                highContrast: highContrastCheckbox.checked
            },
            notifications: {
                nearby: nearbyCheckbox.checked,
                updates: updatesCheckbox.checked,
                community: communityCheckbox.checked
            }
        };
        
        // Save preferences to localStorage
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        
        // Show success message
        alert('Preferences saved successfully!');
        
        // Redirect to home page (which we'll create later)
        window.location.href = 'home.html';
    });
}); 