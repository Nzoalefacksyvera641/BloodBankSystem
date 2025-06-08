document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Theme selection
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            const theme = option.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            
            // Save theme preference
            saveSetting('theme', theme);
        });
    });
    
    // Load saved settings
    loadSettings();
    
    // Save button
    document.getElementById('save-settings').addEventListener('click', saveAllSettings);
    
    // Reset button
    document.getElementById('reset-settings').addEventListener('click', resetSettings);
    
    // Animation level change
    document.getElementById('animation-level').addEventListener('change', function() {
        applyAnimationLevel(this.value);
        saveSetting('animationLevel', this.value);
    });
});

// Load saved settings from localStorage
function loadSettings() {
    // General settings
    const expiryAlert = localStorage.getItem('bloodExpiryAlert');
    const lowStockThreshold = localStorage.getItem('lowStockThreshold');
    const autoBackup = localStorage.getItem('autoBackup');
    
    if (expiryAlert) document.getElementById('blood-expiry-alert').value = expiryAlert;
    if (lowStockThreshold) document.getElementById('low-stock-threshold').value = lowStockThreshold;
    if (autoBackup) document.getElementById('auto-backup').checked = autoBackup === 'true';
    
    // Notification settings
    const emailNotifications = localStorage.getItem('emailNotifications');
    const smsNotifications = localStorage.getItem('smsNotifications');
    const criticalAlerts = localStorage.getItem('criticalAlerts');
    
    if (emailNotifications) document.getElementById('email-notifications').checked = emailNotifications === 'true';
    if (smsNotifications) document.getElementById('sms-notifications').checked = smsNotifications === 'true';
    if (criticalAlerts) document.getElementById('critical-alerts').value = criticalAlerts;
    
    // Privacy settings
    const dataEncryption = localStorage.getItem('dataEncryption');
    const autoLogout = localStorage.getItem('autoLogout');
    const auditLog = localStorage.getItem('auditLog');
    
    if (dataEncryption) document.getElementById('data-encryption').checked = dataEncryption === 'true';
    if (autoLogout) document.getElementById('auto-logout').value = autoLogout;
    if (auditLog) document.getElementById('audit-log').checked = auditLog === 'true';
    
    // Appearance settings
    const theme = localStorage.getItem('theme') || 'light';
    const fontSize = localStorage.getItem('fontSize');
    const animationLevel = localStorage.getItem('animationLevel');
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector(`.theme-option[data-theme="${theme}"]`).classList.add('active');
    
    if (fontSize) {
        document.getElementById('font-size').value = fontSize;
        applyFontSize(fontSize);
    }
    
    if (animationLevel) {
        document.getElementById('animation-level').value = animationLevel;
        applyAnimationLevel(animationLevel);
    }
}

// Save all settings to localStorage
function saveAllSettings() {
    // General settings
    saveSetting('bloodExpiryAlert', document.getElementById('blood-expiry-alert').value);
    saveSetting('lowStockThreshold', document.getElementById('low-stock-threshold').value);
    saveSetting('autoBackup', document.getElementById('auto-backup').checked);
    
    // Notification settings
    saveSetting('emailNotifications', document.getElementById('email-notifications').checked);
    saveSetting('smsNotifications', document.getElementById('sms-notifications').checked);
    saveSetting('criticalAlerts', document.getElementById('critical-alerts').value);
    
    // Privacy settings
    saveSetting('dataEncryption', document.getElementById('data-encryption').checked);
    saveSetting('autoLogout', document.getElementById('auto-logout').value);
    saveSetting('auditLog', document.getElementById('audit-log').checked);
    
    // Appearance settings
    saveSetting('fontSize', document.getElementById('font-size').value);
    saveSetting('animationLevel', document.getElementById('animation-level').value);
    
    // Show save notification
    showSaveNotification();
    
    // Apply appearance settings immediately
    applyFontSize(document.getElementById('font-size').value);
    applyAnimationLevel(document.getElementById('animation-level').value);
}

// Save individual setting
function saveSetting(key, value) {
    localStorage.setItem(key, value);
}

// Reset all settings to default
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        localStorage.clear();
        
        // Reset form values
        document.getElementById('blood-expiry-alert').value = 7;
        document.getElementById('low-stock-threshold').value = 10;
        document.getElementById('auto-backup').checked = true;
        
        document.getElementById('email-notifications').checked = true;
        document.getElementById('sms-notifications').checked = false;
        document.getElementById('critical-alerts').value = 'default';
        
        document.getElementById('data-encryption').checked = true;
        document.getElementById('auto-logout').value = 30;
        document.getElementById('audit-log').checked = true;
        
        document.getElementById('font-size').value = 'medium';
        document.getElementById('animation-level').value = 'full';
        
        // Reset theme
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.theme-option[data-theme="light"]').classList.add('active');
        document.querySelector('.theme-option[data-theme="dark"]').classList.remove('active');
        document.querySelector('.theme-option[data-theme="red"]').classList.remove('active');
        
        // Apply appearance settings
        applyFontSize('medium');
        applyAnimationLevel('full');
        
        showSaveNotification('Settings reset to default!');
    }
}

// Show save notification
function showSaveNotification(message = 'Settings saved successfully!') {
    const notification = document.getElementById('save-notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Apply font size setting
function applyFontSize(size) {
    const sizes = {
        'small': '14px',
        'medium': '16px',
        'large': '18px'
    };
    
    document.body.style.fontSize = sizes[size] || '16px';
}

// Apply animation level setting
function applyAnimationLevel(level) {
    const settingItems = document.querySelectorAll('.setting-item');
    
    if (level === 'none') {
        settingItems.forEach(item => {
            item.style.animation = 'none';
        });
    } else if (level === 'reduced') {
        settingItems.forEach(item => {
            item.style.animationDuration = '0.2s';
        });
    } else {
        settingItems.forEach(item => {
            item.style.animation = '';
            item.style.animationDuration = '';
        });
    }
}