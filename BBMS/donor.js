document.addEventListener('DOMContentLoaded', function() {
    const donorForm = document.getElementById('donorForm');
    
    // Initialize blood drop animations
    initBloodDrops();
    
    // Set max date for last donation (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('lastDonation').max = today;
    
    // Form submission handler
    donorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const bloodType = document.getElementById('bloodType').value;
        const address = document.getElementById('address').value;
        const lastDonation = document.getElementById('lastDonation').value;
        const healthDeclaration = document.getElementById('healthDeclaration').checked;
        
        // Validate form
        if (!validateForm(fullName, email, phone, age, gender, bloodType, address, healthDeclaration)) {
            return;
        }
        
        // Simulate form submission with animation
        simulateRegistration();
    });
});

function initBloodDrops() {
    // Additional blood drop animations can be added here
    console.log('Blood drop animations initialized');
}

function validateForm(fullName, email, phone, age, gender, bloodType, address, healthDeclaration) {
    // Reset error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    let isValid = true;
    
    if (!fullName) {
        showError('fullName', 'Full name is required');
        isValid = false;
    }
    
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }
    
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (!age) {
        showError('age', 'Age is required');
        isValid = false;
    } else if (age < 18 || age > 65) {
        showError('age', 'Donors must be between 18-65 years old');
        isValid = false;
    }
    
    if (!gender) {
        showError('gender', 'Gender is required');
        isValid = false;
    }
    
    if (!bloodType) {
        showError('bloodType', 'Blood type is required');
        isValid = false;
    }
    
    if (!address) {
        showError('address', 'Address is required');
        isValid = false;
    }
    
    if (!healthDeclaration) {
        document.querySelector('.checkbox-group').classList.add('error');
        isValid = false;
    }
    
    return isValid;
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

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
}

function simulateRegistration() {
    const btn = document.querySelector('.btn-register');
    const originalText = btn.textContent;
    
    // Disable button and show loading state
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    
    // Simulate API call
    setTimeout(() => {
        // Show success animation
        btn.innerHTML = '<i class="fas fa-check"></i> Registration Successful!';
        btn.style.backgroundColor = '#4CAF50';
        
        // Show thank you message
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.innerHTML = `
            <h3>Thank you for registering as a donor!</h3>
            <p>We'll contact you soon with more information about donation opportunities.</p>
            <div class="heart-animation">
                <i class="fas fa-heart"></i>
            </div>
        `;
        thankYouMessage.style.textAlign = 'center';
        thankYouMessage.style.marginTop = '1.5rem';
        thankYouMessage.style.animation = 'fadeIn 1s ease';
        
        document.querySelector('.form-container').appendChild(thankYouMessage);
        
        // Add heart animation
        const heart = thankYouMessage.querySelector('.heart-animation i');
        heart.style.color = '#ff0033';
        heart.style.fontSize = '3rem';
        heart.style.animation = 'heartbeat 1.5s infinite';
        
        // Reset form after delay
        setTimeout(() => {
            donorForm.reset();
            btn.disabled = false;
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            thankYouMessage.remove();
        }, 5000);
    }, 2000);
}