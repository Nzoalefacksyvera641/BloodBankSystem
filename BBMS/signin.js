document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    
    // Check for remembered credentials
    if (localStorage.getItem('rememberedEmail')) {
        document.getElementById('email').value = localStorage.getItem('rememberedEmail');
        rememberCheckbox.checked = true;
    }
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Form submission
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = rememberCheckbox.checked;
        
        // Store email if remember me is checked
        if (remember) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Here you would typically validate credentials with your server
        console.log('Signin data:', { email, password });
        
        // Show loading state
        const btn = document.querySelector('.btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, we'll assume login is successful
            btn.innerHTML = '<i class="fas fa-check"></i> Success!';
            btn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 1000);
        }, 1500);
    });
    
    // Add animation to input fields when focused
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const input = group.querySelector('input');
        input.addEventListener('focus', () => {
            group.querySelector('i').style.color = '#d12222';
            group.querySelector('label').style.color = '#d12222';
        });
        input.addEventListener('blur', () => {
            group.querySelector('i').style.color = '#777';
            if (!input.value) {
                group.querySelector('label').style.color = '#777';
            }
        });
    });
    
    // Social login buttons
    document.querySelector('.social-icon.google').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Google login would be implemented here');
    });
    
    document.querySelector('.social-icon.facebook').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Facebook login would be implemented here');
    });
    
    // Forgot password
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset functionality would be implemented here');
    });
});