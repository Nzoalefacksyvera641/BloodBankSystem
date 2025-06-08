document.addEventListener('DOMContentLoaded', function() {
    // Debugging check
    console.log('Admin JS loaded successfully');
    
    // Toggle sidebar collapse
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (!menuToggle || !sidebar || !mainContent) {
        console.error('Essential elements not found in DOM');
        return;
    }

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
        
        // Save state in localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
        
        console.log('Sidebar toggled, collapsed:', isCollapsed);
    });
    
    // Check localStorage for collapsed state
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('collapsed');
        console.log('Restored collapsed state from localStorage');
    }
    
    // Initialize charts
    initCharts();
    
    // Add animation to stats cards
    animateStatsCards();
    
    // Add hover effect to inventory items
    setupInventoryHover();
    
    // Handle responsive behavior
    window.addEventListener('resize', handleResponsiveSidebar);
    handleResponsiveSidebar(); // Initial call
});

function handleResponsiveSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    if (window.innerWidth <= 992) {
        sidebar.classList.remove('collapsed');
        sidebar.classList.add('mobile-sidebar');
        console.log('Mobile sidebar activated');
    } else {
        sidebar.classList.remove('mobile-sidebar');
        
        // Restore collapsed state if it was collapsed before
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            sidebar.classList.add('collapsed');
            document.querySelector('.main-content')?.classList.add('collapsed');
        }
        console.log('Desktop sidebar activated');
    }
}

function initCharts() {
    console.log('Initializing charts...');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    
    // Donations Chart (Line Chart)
    const donationsCtx = document.getElementById('donationsChart');
    if (donationsCtx) {
        new Chart(donationsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Blood Donations',
                    data: [120, 190, 170, 220, 210, 195],
                    backgroundColor: 'rgba(230, 57, 70, 0.1)',
                    borderColor: 'rgba(230, 57, 70, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgba(230, 57, 70, 1)',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: getChartOptions()
        });
        console.log('Donations chart initialized');
    } else {
        console.warn('Donations chart element not found');
    }
    
    // Blood Type Distribution Chart (Doughnut Chart)
    const bloodTypeCtx = document.getElementById('bloodTypeChart');
    if (bloodTypeCtx) {
        new Chart(bloodTypeCtx, {
            type: 'doughnut',
            data: {
                labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                datasets: [{
                    data: [28, 6, 15, 4, 8, 2, 35, 12],
                    backgroundColor: [
                        '#e63946', '#ef476f', '#ffd166', '#06d6a0',
                        '#118ab2', '#073b4c', '#7209b7', '#f15bb5'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                ...getChartOptions(),
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                family: 'Poppins',
                                size: 12
                            },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                }
            }
        });
        console.log('Blood type chart initialized');
    } else {
        console.warn('Blood type chart element not found');
    }
}

function getChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    family: 'Poppins',
                    size: 14
                },
                bodyFont: {
                    family: 'Poppins',
                    size: 12
                },
                padding: 12,
                cornerRadius: 6,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: {
                        family: 'Poppins'
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: 'Poppins'
                    }
                }
            }
        }
    };
}

function animateStatsCards() {
    const statsCards = document.querySelectorAll('.stats-card');
    console.log(`Found ${statsCards.length} stats cards to animate`);
    
    statsCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate__animated', 'animate__fadeInUp');
    });
}

function setupInventoryHover() {
    const inventoryItems = document.querySelectorAll('.inventory-item');
    console.log(`Found ${inventoryItems.length} inventory items`);
    
    inventoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const barFill = this.querySelector('.bar-fill');
            if (!barFill) return;
            
            const currentWidth = barFill.style.width || '0%';
            
            // Animate the bar fill on hover
            barFill.style.transition = 'none';
            barFill.style.width = '0%';
            
            // Trigger reflow to restart animation
            void barFill.offsetWidth;
            
            barFill.style.transition = 'width 0.6s ease';
            barFill.style.width = currentWidth;
        });
    });
}