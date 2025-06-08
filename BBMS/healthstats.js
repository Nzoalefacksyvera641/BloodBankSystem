document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize all charts and data
    initializeBloodInventory();
    initializeDonationChart();
    initializeHealthChart();
    initializeUrgentNeeds();
    
    // Set last refresh time
    updateRefreshTime();
    
    // Set up periodic refresh (every 5 minutes)
    setInterval(refreshData, 5 * 60 * 1000);
    
    // Set up event listeners
    document.getElementById('donation-time-filter').addEventListener('change', updateDonationChart);
    document.getElementById('health-metric-filter').addEventListener('change', updateHealthChart);
    document.getElementById('urgency-filter').addEventListener('change', filterUrgentNeeds);
    document.getElementById('refresh-needs-btn').addEventListener('click', refreshUrgentNeeds);
});

function updateRefreshTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    document.getElementById('last-refresh-time').textContent = `${dateString} at ${timeString}`;
}

function initializeBloodInventory() {
    // Simulate fetching blood inventory data
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    let criticalCount = 0;
    let lowCount = 0;
    let sufficientCount = 0;
    
    bloodTypes.forEach(type => {
        // Random data for demo (in a real app, this would come from an API)
        const maxUnits = Math.floor(Math.random() * 50) + 20; // 20-70 units max capacity
        const currentUnits = Math.floor(Math.random() * maxUnits);
        const percentage = (currentUnits / maxUnits) * 100;
        
        // Update the DOM
        const bloodTypeElement = document.querySelector(`.blood-type[data-type="${type}"]`);
        const bloodBar = bloodTypeElement.querySelector('.blood-bar');
        const bloodQuantity = bloodTypeElement.querySelector('.blood-quantity');
        
        // Animate the bar
        setTimeout(() => {
            bloodBar.style.width = `${percentage}%`;
            
            // Color based on percentage
            if (percentage < 15) {
                bloodBar.style.background = '#d32f2f';
                criticalCount++;
                bloodTypeElement.classList.add('critical');
                bloodBar.style.animation = 'bloodPulse 2s infinite';
            } else if (percentage < 30) {
                bloodBar.style.background = '#ff8f00';
                lowCount++;
                bloodTypeElement.classList.add('low');
            } else {
                bloodBar.style.background = '#388e3c';
                sufficientCount++;
                bloodTypeElement.classList.add('sufficient');
            }
        }, 100);
        
        bloodQuantity.textContent = `${currentUnits} units`;
    });
    
    // Update summary counts
    document.getElementById('critical-blood').textContent = criticalCount;
    document.getElementById('low-blood').textContent = lowCount;
    document.getElementById('sufficient-blood').textContent = sufficientCount;
    
    // Update inventory update time
    const now = new Date();
    document.getElementById('inventory-update-time').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function initializeDonationChart() {
    const ctx = document.getElementById('donationChart').getContext('2d');
    window.donationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Donations',
                data: [],
                backgroundColor: 'rgba(211, 47, 47, 0.2)',
                borderColor: 'rgba(211, 47, 47, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    updateDonationChart();
}

function updateDonationChart() {
    const days = parseInt(document.getElementById('donation-time-filter').value);
    const labels = [];
    const data = [];
    
    // Generate labels based on selected time period
    if (days === 7) {
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            data.push(Math.floor(Math.random() * 20) + 5); // 5-25 donations per day
        }
    } else if (days === 30) {
        // Last 30 days (grouped by week)
        for (let i = 3; i >= 0; i--) {
            labels.push(`Week ${4 - i}`);
            data.push(Math.floor(Math.random() * 100) + 30); // 30-130 donations per week
        }
    } else {
        // Last 90 days (grouped by month)
        for (let i = 2; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
            data.push(Math.floor(Math.random() * 250) + 100); // 100-350 donations per month
        }
    }
    
    // Update chart
    window.donationChart.data.labels = labels;
    window.donationChart.data.datasets[0].data = data;
    window.donationChart.update();
    
    // Update summary stats
    const totalDonations = data.reduce((sum, val) => sum + val, 0);
    const avgDonations = totalDonations / (days === 7 ? 7 : (days === 30 ? 4 : 3));
    const prevPeriodAvg = avgDonations * (0.9 + Math.random() * 0.2); // Random trend between -10% to +10%
    const trend = ((avgDonations - prevPeriodAvg) / prevPeriodAvg) * 100;
    
    document.getElementById('total-donations').textContent = totalDonations;
    document.getElementById('total-donors').textContent = Math.floor(totalDonations * (0.8 + Math.random() * 0.4)); // 80-120% of donations
    document.getElementById('donation-trend').textContent = trend.toFixed(1);
    
    // Color trend indicator
    const trendElement = document.getElementById('donation-trend');
    if (trend > 0) {
        trendElement.style.color = '#388e3c';
        trendElement.textContent = '+' + trendElement.textContent;
    } else if (trend < 0) {
        trendElement.style.color = '#d32f2f';
    } else {
        trendElement.style.color = '#ff8f00';
    }
}

function initializeHealthChart() {
    const ctx = document.getElementById('healthChart').getContext('2d');
    window.healthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['<20', '20-29', '30-39', '40-49', '50-59', '60+'],
            datasets: [{
                label: 'Donors',
                data: [],
                backgroundColor: 'rgba(211, 47, 47, 0.7)',
                borderColor: 'rgba(211, 47, 47, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    updateHealthChart();
}

function updateHealthChart() {
    const metric = document.getElementById('health-metric-filter').value;
    const data = [];
    let metricValue, metricRange, metricStatus, metricUnit;
    
    // Generate random data based on selected metric
    for (let i = 0; i < 6; i++) {
        data.push(Math.floor(Math.random() * 50) + 10); // 10-60 donors per age group
    }
    
    // Update chart
    window.healthChart.data.datasets[0].data = data;
    window.healthChart.update();
    
    // Update metric info based on selection
    if (metric === 'hemoglobin') {
        metricValue = (12.5 + Math.random() * 3).toFixed(1); // 12.5-15.5 g/dL
        metricRange = '12.0-16.0';
        metricUnit = 'g/dL';
        metricStatus = Math.random() > 0.9 ? 'Low' : 'Normal';
    } else if (metric === 'blood-pressure') {
        metricValue = `${Math.floor(110 + Math.random() * 20)}/${Math.floor(70 + Math.random() * 15)}`; // 110-130 / 70-85
        metricRange = '90-120/60-80';
        metricUnit = 'mmHg';
        metricStatus = Math.random() > 0.85 ? 'Elevated' : 'Normal';
    } else {
        metricValue = Math.floor(60 + Math.random() * 30); // 60-90 bpm
        metricRange = '60-100';
        metricUnit = 'bpm';
        metricStatus = 'Normal';
    }
    
    // Update summary
    document.getElementById('metric-value').textContent = metricValue;
    document.getElementById('metric-unit').textContent = metricUnit;
    document.getElementById('metric-range').textContent = metricRange;
    document.getElementById('metric-status').textContent = metricStatus;
    
    // Update status color
    const statusElement = document.getElementById('health-metric-status');
    if (metricStatus === 'Normal') {
        statusElement.style.color = '#388e3c';
    } else if (metricStatus === 'Elevated') {
        statusElement.style.color = '#ff8f00';
    } else {
        statusElement.style.color = '#d32f2f';
    }
}

function initializeUrgentNeeds() {
    refreshUrgentNeeds();
}

function refreshUrgentNeeds() {
    // Show loading state
    const needsList = document.getElementById('needs-list');
    needsList.innerHTML = '<div class="loading-needs">Loading urgent needs...</div>';
    
    // Simulate API call delay
    setTimeout(() => {
        // Randomly generate some urgent needs (in a real app, this would come from an API)
        const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        const hospitals = [
            'City General Hospital', 
            'Regional Medical Center', 
            'Children\'s Hospital', 
            'University Hospital',
            'Memorial Hospital'
        ];
        
        const needs = [];
        const numNeeds = Math.floor(Math.random() * 5); // 0-4 needs
        
        for (let i = 0; i < numNeeds; i++) {
            const isCritical = Math.random() > 0.5;
            const daysAgo = Math.floor(Math.random() * 3);
            const date = new Date();
            date.setDate(date.getDate() - daysAgo);
            
            needs.push({
                type: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
                quantity: Math.floor(Math.random() * 10) + (isCritical ? 10 : 1), // 1-10 or 10-20 units
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
                date: date,
                critical: isCritical
            });
        }
        
        // Sort by critical first, then by date
        needs.sort((a, b) => {
            if (a.critical && !b.critical) return -1;
            if (!a.critical && b.critical) return 1;
            return a.date - b.date;
        });
        
        // Update the DOM
        displayUrgentNeeds(needs);
    }, 1000);
}

function displayUrgentNeeds(needs) {
    const needsList = document.getElementById('needs-list');
    
    if (needs.length === 0) {
        needsList.innerHTML = '<div class="no-needs">No urgent needs at this time</div>';
        return;
    }
    
    needsList.innerHTML = '';
    
    needs.forEach(need => {
        const needElement = document.createElement('div');
        needElement.className = `need-item ${need.critical ? 'critical' : ''}`;
        
        const dateString = need.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        needElement.innerHTML = `
            <div>
                <div class="need-type">${need.type} <span class="need-quantity">${need.quantity} units needed</span></div>
                <div class="need-hospital">${need.hospital}</div>
            </div>
            <div class="need-date">${dateString}</div>
        `;
        
        needsList.appendChild(needElement);
    });
}

function filterUrgentNeeds() {
    const filter = document.getElementById('urgency-filter').value;
    const needsList = document.getElementById('needs-list');
    const needs = needsList.querySelectorAll('.need-item');
    
    needs.forEach(need => {
        if (filter === 'all') {
            need.style.display = 'flex';
        } else {
            if (need.classList.contains('critical')) {
                need.style.display = 'flex';
            } else {
                need.style.display = 'none';
            }
        }
    });
}

function refreshData() {
    // Refresh all data
    initializeBloodInventory();
    updateDonationChart();
    updateHealthChart();
    refreshUrgentNeeds();
    updateRefreshTime();
    
    // Show refresh animation
    const container = document.querySelector('.healthstats-container');
    container.style.animation = 'none';
    setTimeout(() => {
        container.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
}