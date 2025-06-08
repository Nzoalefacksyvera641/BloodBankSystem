document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const bloodType = document.getElementById('bloodType').value;
        const terms = document.getElementById('terms').checked;
        
        // Simple validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (!terms) {
            alert('You must agree to the terms and conditions!');
            return;
        }
        
        // Here you would typically send the data to your server
        console.log('Signup data:', { fullName, email, password, bloodType });
        
        // Show success animation
        const btn = document.querySelector('.btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Success!';
        btn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            // Redirect to dashboard or signin page
            window.location.href = 'dashboard.html';
        }, 1500);
    });
    
    // Add animation to input fields when focused
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const input = group.querySelector('input, select');
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
});