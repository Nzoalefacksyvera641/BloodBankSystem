document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    
    // Initialize blood cell animations
    initBloodCells();
    
    // Check for remembered credentials
    checkRememberedCredentials();
    
    // Form submission handler
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validate form
        if (!email) {
            showError('email', 'Email is required');
            return;
        }
        
        if (!password) {
            showError('password', 'Password is required');
            return;
        }
        
        // Remember credentials if checkbox is checked
        if (remember) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Simulate form submission with animation
        simulateSignIn();
    });
    
    // Toggle password visibility
    window.togglePassword = function(fieldId) {
        const field = document.getElementById(fieldId);
        const icon = field.nextElementSibling.querySelector('i');
        
        if (field.type === 'password') {
            field.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            field.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };
});

function initBloodCells() {
    // Additional blood cell animations can be added here
    console.log('Blood cell animations initialized');
}

function checkRememberedCredentials() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Add error class
    formGroup.classList.add('error');
    
    // Create or update error message
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = '#ff0033';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.3rem';
}

function simulateSignIn() {
    const btn = document.querySelector('.btn-signin');
    const originalText = btn.textContent;
    
    // Disable button and show loading state
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    
    // Simulate API call
    setTimeout(() => {
        // Show success animation
        btn.innerHTML = '<i class="fas fa-check"></i> Success!';
        btn.style.backgroundColor = '#4CAF50';
        
        // Redirect to dashboard after delay
        setTimeout(() => {
            window.location.href = 'admin_dashboard.html'; // Replace with your dashboard page
        }, 1000);
    }, 1500);
}