document.addEventListener('DOMContentLoaded', function() {
    // Sample data for blood inventory
    const bloodStockData = [
        { type: 'A+', quantity: 15, status: 'adequate' },
        { type: 'A-', quantity: 8, status: 'low' },
        { type: 'B+', quantity: 12, status: 'adequate' },
        { type: 'B-', quantity: 4, status: 'critical' },
        { type: 'AB+', quantity: 6, status: 'low' },
        { type: 'AB-', quantity: 2, status: 'critical' },
        { type: 'O+', quantity: 20, status: 'adequate' },
        { type: 'O-', quantity: 5, status: 'low' }
    ];

    const bloodInventoryData = [
        { id: 'BLD-001', type: 'A+', donor: 'John Smith', collectionDate: '2023-05-15', expiryDate: '2023-06-15', status: 'available', location: 'Fridge A1' },
        { id: 'BLD-002', type: 'B+', donor: 'Sarah Johnson', collectionDate: '2023-05-16', expiryDate: '2023-06-16', status: 'reserved', location: 'Fridge B2' },
        { id: 'BLD-003', type: 'O-', donor: 'Michael Brown', collectionDate: '2023-05-10', expiryDate: '2023-06-10', status: 'available', location: 'Fridge C3' },
        { id: 'BLD-004', type: 'AB+', donor: 'Emily Davis', collectionDate: '2023-05-18', expiryDate: '2023-06-18', status: 'available', location: 'Fridge A2' },
        { id: 'BLD-005', type: 'A-', donor: 'Robert Wilson', collectionDate: '2023-05-05', expiryDate: '2023-06-05', status: 'expired', location: 'Quarantine' },
        { id: 'BLD-006', type: 'O+', donor: 'Jennifer Lee', collectionDate: '2023-05-20', expiryDate: '2023-06-20', status: 'available', location: 'Fridge B1' },
        { id: 'BLD-007', type: 'B-', donor: 'David Miller', collectionDate: '2023-05-12', expiryDate: '2023-06-12', status: 'reserved', location: 'Fridge C2' },
        { id: 'BLD-008', type: 'A+', donor: 'Lisa Taylor', collectionDate: '2023-05-17', expiryDate: '2023-06-17', status: 'available', location: 'Fridge A3' }
    ];

    // DOM Elements
    const bloodCardsContainer = document.querySelector('.blood-cards-container');
    const inventoryTableBody = document.querySelector('.blood-inventory-table tbody');
    const addBloodModal = document.getElementById('add-blood-modal');
    const requestBloodModal = document.getElementById('request-blood-modal');
    const addBloodBtn = document.getElementById('add-blood-btn');
    const requestBloodBtn = document.getElementById('request-blood-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const addBloodForm = document.getElementById('add-blood-form');
    const requestBloodForm = document.getElementById('request-blood-form');

    // Initialize the page
    function init() {
        renderBloodStockCards();
        renderInventoryTable();
        setupEventListeners();
    }

    // Render blood stock cards
    function renderBloodStockCards() {
        bloodCardsContainer.innerHTML = '';
        
        bloodStockData.forEach(item => {
            const card = document.createElement('div');
            card.className = `blood-card ${item.type.toLowerCase().replace('+', '-positive').replace('-', '-negative')}`;
            
            let statusClass;
            if (item.quantity >= 10) statusClass = 'status-adequate';
            else if (item.quantity >= 5) statusClass = 'status-low';
            else statusClass = 'status-critical';
            
            card.innerHTML = `
                <div class="blood-type">${item.type}</div>
                <div class="blood-quantity">${item.quantity}</div>
                <div class="blood-units">units</div>
                <div class="blood-status ${statusClass}">
                    ${item.quantity >= 10 ? 'Adequate' : item.quantity >= 5 ? 'Low' : 'Critical'}
                </div>
            `;
            
            bloodCardsContainer.appendChild(card);
            
            // Add animation when card is added
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // Render inventory table
    function renderInventoryTable() {
        inventoryTableBody.innerHTML = '';
        
        bloodInventoryData.forEach((item, index) => {
            const row = document.createElement('tr');
            
            // Add animation delay based on index
            row.style.animationDelay = `${index * 0.1}s`;
            
            let statusClass;
            if (item.status === 'available') statusClass = 'available';
            else if (item.status === 'reserved') statusClass = 'reserved';
            else statusClass = 'expired';
            
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.type}</td>
                <td>${item.donor}</td>
                <td>${formatDate(item.collectionDate)}</td>
                <td>${formatDate(item.expiryDate)}</td>
                <td><span class="status-badge ${statusClass}">${capitalizeFirstLetter(item.status)}</span></td>
                <td>${item.location}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete" title="Delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
            
            inventoryTableBody.appendChild(row);
        });
    }

    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Capitalize first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Open modals
        addBloodBtn.addEventListener('click', () => toggleModal(addBloodModal));
        requestBloodBtn.addEventListener('click', () => toggleModal(requestBloodModal));
        
        // Close modals
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                toggleModal(modal);
            });
        });
        
        // Close modal when clicking outside
        [addBloodModal, requestBloodModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    toggleModal(modal);
                }
            });
        });
        
        // Form submissions
        addBloodForm.addEventListener('submit', handleAddBlood);
        requestBloodForm.addEventListener('submit', handleRequestBlood);
        
        // Add animation to blood cards on hover
        document.querySelectorAll('.blood-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Toggle modal visibility
    function toggleModal(modal) {
        modal.classList.toggle('active');
        
        if (modal.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Handle add blood form submission
    function handleAddBlood(e) {
        e.preventDefault();
        
        // Get form values
        const bloodType = document.getElementById('blood-type').value;
        const donorId = document.getElementById('donor-id').value;
        const collectionDate = document.getElementById('collection-date').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const storageLocation = document.getElementById('storage-location').value;
        
        // In a real app, you would send this data to the server
        console.log('Adding blood unit:', {
            bloodType,
            donorId,
            collectionDate,
            expiryDate,
            storageLocation
        });
        
        // Show success animation
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        submitBtn.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            toggleModal(addBloodModal);
            submitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Add Unit';
            submitBtn.style.backgroundColor = 'var(--primary-color)';
            
            // Reset form
            addBloodForm.reset();
            
            // Simulate adding the new unit to the inventory
            simulateNewBloodUnit(bloodType, donorId, collectionDate, expiryDate, storageLocation);
        }, 1500);
    }

    // Handle request blood form submission
    function handleRequestBlood(e) {
        e.preventDefault();
        
        // Get form values
        const bloodType = document.getElementById('request-blood-type').value;
        const quantity = document.getElementById('quantity').value;
        const patientId = document.getElementById('patient-id').value;
        const urgency = document.getElementById('urgency').value;
        const notes = document.getElementById('request-notes').value;
        
        // In a real app, you would send this data to the server
        console.log('Requesting blood:', {
            bloodType,
            quantity,
            patientId,
            urgency,
            notes
        });
        
        // Show success animation
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
        submitBtn.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            toggleModal(requestBloodModal);
            submitBtn.innerHTML = '<i class="fas fa-hand-holding-medical"></i> Submit Request';
            submitBtn.style.backgroundColor = 'var(--primary-color)';
            
            // Reset form
            requestBloodForm.reset();
            
            // Show notification
            showNotification(`Blood request for ${quantity} unit(s) of ${bloodType} submitted successfully!`);
        }, 1500);
    }

    // Simulate adding a new blood unit to the inventory
    function simulateNewBloodUnit(type, donorId, collectionDate, expiryDate, location) {
        // Generate a random donor name for demo purposes
        const donorNames = ['Alex Johnson', 'Maria Garcia', 'James Wilson', 'Emma Brown', 'Daniel Kim'];
        const randomDonor = donorNames[Math.floor(Math.random() * donorNames.length)];
        
        // Generate a new ID
        const newId = `BLD-${String(bloodInventoryData.length + 1).padStart(3, '0')}`;
        
        // Create new blood unit
        const newUnit = {
            id: newId,
            type: type,
            donor: randomDonor,
            collectionDate: collectionDate,
            expiryDate: expiryDate,
            status: 'available',
            location: location
        };
        
        // Add to the beginning of the array
        bloodInventoryData.unshift(newUnit);
        
        // Update the corresponding blood stock
        const stockItem = bloodStockData.find(item => item.type === type);
        if (stockItem) {
            stockItem.quantity += 1;
        }
        
        // Re-render the UI
        renderBloodStockCards();
        renderInventoryTable();
        
        // Show notification
        showNotification(`New blood unit (${type}) added successfully!`);
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--success-color)';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '1000';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Animate out after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            // Remove after animation completes
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize the application
    init();
});