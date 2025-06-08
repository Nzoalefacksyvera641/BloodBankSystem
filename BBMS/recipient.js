document.addEventListener('DOMContentLoaded', function() {
    const recipientForm = document.getElementById('recipientForm');
    
    // Initialize blood bag animations
    initBloodBags();
    
    // Form submission handler
    recipientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const patientName = document.getElementById('patientName').value;
        const patientAge = document.getElementById('patientAge').value;
        const patientGender = document.getElementById('patientGender').value;
        const bloodType = document.getElementById('bloodType').value;
        const unitsRequired = document.getElementById('unitsRequired').value;
        const urgency = document.getElementById('urgency').value;
        const hospital = document.getElementById('hospital').value;
        const hospitalAddress = document.getElementById('hospitalAddress').value;
        const contactPerson = document.getElementById('contactPerson').value;
        const contactPhone = document.getElementById('contactPhone').value;
        const diagnosis = document.getElementById('diagnosis').value;
        
        // Validate form
        if (!validateForm(
            patientName, patientAge, patientGender, bloodType, 
            unitsRequired, urgency, hospital, hospitalAddress, 
            contactPerson, contactPhone, diagnosis
        )) {
            return;
        }
        
        // Simulate form submission with animation
        simulateRequest();
    });
});

function initBloodBags() {
    // Additional blood bag animations can be added here
    console.log('Blood bag animations initialized');
}

function validateForm(
    patientName, patientAge, patientGender, bloodType, 
    unitsRequired, urgency, hospital, hospitalAddress, 
    contactPerson, contactPhone, diagnosis
) {
    // Reset error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    let isValid = true;
    
    if (!patientName) {
        showError('patientName', 'Patient name is required');
        isValid = false;
    }
    
    if (!patientAge) {
        showError('patientAge', 'Patient age is required');
        isValid = false;
    } else if (patientAge < 1) {
        showError('patientAge', 'Please enter a valid age');
        isValid = false;
    }
    
    if (!patientGender) {
        showError('patientGender', 'Patient gender is required');
        isValid = false;
    }
    
    if (!bloodType) {
        showError('bloodType', 'Blood type is required');
        isValid = false;
    }
    
    if (!unitsRequired) {
        showError('unitsRequired', 'Units required is required');
        isValid = false;
    } else if (unitsRequired < 1 || unitsRequired > 10) {
        showError('unitsRequired', 'Please enter between 1-10 units');
        isValid = false;
    }
    
    if (!urgency) {
        showError('urgency', 'Urgency level is required');
        isValid = false;
    }
    
    if (!hospital) {
        showError('hospital', 'Hospital name is required');
        isValid = false;
    }
    
    if (!hospitalAddress) {
        showError('hospitalAddress', 'Hospital address is required');
        isValid = false;
    }
    
    if (!contactPerson) {
        showError('contactPerson', 'Contact person is required');
        isValid = false;
    }
    
    if (!contactPhone) {
        showError('contactPhone', 'Contact phone is required');
        isValid = false;
    } else if (!isValidPhone(contactPhone)) {
        showError('contactPhone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (!diagnosis) {
        showError('diagnosis', 'Diagnosis/reason is required');
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

function isValidPhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
}

function simulateRequest() {
    const btn = document.querySelector('.btn-request');
    const originalText = btn.textContent;
    
    // Disable button and show loading state
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate API call
    setTimeout(() => {
        // Show success animation
        btn.innerHTML = '<i class="fas fa-check"></i> Request Submitted!';
        btn.style.backgroundColor = '#4CAF50';
        
        // Show request details
        const requestDetails = document.createElement('div');
        requestDetails.className = 'request-details';
        requestDetails.innerHTML = `
            <h3>Request Received</h3>
            <div class="request-summary">
                <p><strong>Request ID:</strong> BB-${Math.floor(Math.random() * 10000)}</p>
                <p><strong>Status:</strong> <span class="status-pending">Pending</span></p>
                <p>We've notified our network of donors. You'll receive a confirmation shortly.</p>
            </div>
            <div class="urgency-notice">
                <i class="fas fa-exclamation-triangle"></i>
                <p>For critical requests, please also call our emergency line: <strong>1800-BLOOD-EM</strong></p>
            </div>
        `;
        requestDetails.style.textAlign = 'center';
        requestDetails.style.marginTop = '1.5rem';
        requestDetails.style.animation = 'fadeIn 1s ease';
        
        document.querySelector('.form-container').appendChild(requestDetails);
        
        // Add urgency-specific styling
        const urgency = document.getElementById('urgency').value;
        if (urgency === 'critical') {
            const statusElement = requestDetails.querySelector('.status-pending');
            statusElement.style.color = '#ff0033';
            statusElement.style.fontWeight = 'bold';
            
            const noticeElement = requestDetails.querySelector('.urgency-notice');
            noticeElement.style.color = '#ff0033';
            noticeElement.style.animation = 'pulse 1.5s infinite';
        }
        
        // Reset form after delay
        setTimeout(() => {
            recipientForm.reset();
            btn.disabled = false;
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            requestDetails.remove();
        }, 8000);
    }, 2000);
}