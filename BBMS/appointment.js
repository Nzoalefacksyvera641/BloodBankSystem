document.addEventListener('DOMContentLoaded', function() {
    // Initialize the form with the first step
    showStep(1);
    
    // Set minimum date for appointment (today + 1 day)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const minDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = minDate;
});

function showStep(stepNumber) {
    // Hide all form steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show the current step
    document.querySelector(`.form-step[data-step="${stepNumber}"]`).classList.add('active');
    
    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.step) <= stepNumber) {
            step.classList.add('active');
        }
    });
    
    // Scroll to top of form
    document.querySelector('.appointment-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nextStep(currentStep) {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return;
    }
    
    // If moving to confirmation step, populate confirmation details
    if (currentStep === 2) {
        populateConfirmation();
    }
    
    showStep(currentStep + 1);
}

function prevStep(currentStep) {
    showStep(currentStep - 1);
}

function validateStep(stepNumber) {
    let isValid = true;
    
    if (stepNumber === 1) {
        const requiredFields = ['fullName', 'email', 'phone', 'bloodType', 'donorType'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#f44336';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        // Simple email validation
        const email = document.getElementById('email');
        if (email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
            email.style.borderColor = '#f44336';
            isValid = false;
        }
    } else if (stepNumber === 2) {
        const requiredFields = ['location', 'appointmentDate', 'appointmentTime'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#f44336';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        // Check if terms are agreed
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            agreeTerms.parentElement.style.color = '#f44336';
            isValid = false;
        } else {
            agreeTerms.parentElement.style.color = '';
        }
    }
    
    if (!isValid) {
        // Shake animation for error feedback
        const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        currentStepElement.style.animation = 'none';
        setTimeout(() => {
            currentStepElement.style.animation = 'shake 0.5s ease';
        }, 10);
        
        // Add shake animation temporarily
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.head.removeChild(style);
        }, 500);
    }
    
    return isValid;
}

function populateConfirmation() {
    // Populate confirmation details from form inputs
    document.getElementById('confirmName').textContent = document.getElementById('fullName').value;
    document.getElementById('confirmBloodType').textContent = document.getElementById('bloodType').value;
    document.getElementById('confirmLocation').textContent = document.getElementById('location').options[document.getElementById('location').selectedIndex].text;
    
    // Format date
    const date = new Date(document.getElementById('appointmentDate').value);
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('confirmDate').textContent = formattedDate;
    
    // Format time
    const timeValue = document.getElementById('appointmentTime').value;
    const timeParts = timeValue.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    document.getElementById('confirmTime').textContent = formattedTime;
}

function finishAppointment() {
    // Here you would typically submit the form to the server
    // For demo purposes, we'll just show an alert and reset the form
    
    // Create a blood drop animation
    createBloodDrops();
    
    // Show thank you message
    setTimeout(() => {
        alert('Thank you for scheduling your blood donation appointment! A confirmation has been sent to your email.');
        resetForm();
    }, 2000);
}

function resetForm() {
    // Reset form fields
    document.getElementById('appointmentForm').reset();
    
    // Go back to first step
    showStep(1);
    
    // Reset all step indicators
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
        if (step.dataset.step === '1') {
            step.classList.add('active');
        }
    });
}

function createBloodDrops() {
    const container = document.querySelector('.appointment-container');
    
    for (let i = 0; i < 10; i++) {
        const drop = document.createElement('div');
        drop.innerHTML = '<i class="fas fa-tint"></i>';
        drop.style.position = 'absolute';
        drop.style.color = '#d32f2f';
        drop.style.fontSize = Math.random() * 20 + 10 + 'px';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.top = '-50px';
        drop.style.opacity = '0';
        drop.style.animation = `fall ${Math.random() * 2 + 1}s ease-in forwards`;
        container.appendChild(drop);
        
        // Add animation style
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fall {
                0% { 
                    opacity: 0;
                    transform: translateY(0) rotate(0deg);
                }
                10% {
                    opacity: 1;
                }
                100% { 
                    opacity: 0;
                    transform: translateY(calc(100vh + 50px)) rotate(${Math.random() * 360}deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove the drop and style after animation completes
        setTimeout(() => {
            container.removeChild(drop);
            document.head.removeChild(style);
        }, 3000);
    }
}