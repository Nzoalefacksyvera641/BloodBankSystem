document.addEventListener('DOMContentLoaded', function() {
    console.log('User dashboard loaded');
    
    // Sidebar toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            // For mobile view
            if (window.innerWidth <= 992) {
                sidebar.classList.toggle('active');
                toggleOverlay();
            } 
            // For desktop view
            else {
                toggleSidebarCollapse();
            }
        });
        
        // Check localStorage for collapsed state (desktop only)
        if (window.innerWidth > 992) {
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                document.querySelector('.main-content')?.classList.add('collapsed');
                sidebar.classList.add('collapsed');
            }
        }
    }

    // Initialize animations
    initAnimations();
    
    // Add event listeners
    addCardHoverEffects();
    addButtonEffects();
    
    // Handle responsive behavior
    window.addEventListener('resize', handleResponsiveBehavior);

    // Functions
    function toggleOverlay() {
        if (sidebar.classList.contains('active')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                document.body.removeChild(overlay);
            });
        } else {
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                document.body.removeChild(overlay);
            }
        }
    }

    function toggleSidebarCollapse() {
        const mainContent = document.querySelector('.main-content');
        sidebar.classList.toggle('collapsed');
        mainContent?.classList.toggle('collapsed');
        
        // Save state in localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    }

    function initAnimations() {
        // Scroll animations
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.animate__animated');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    const animationClass = Array.from(element.classList)
                        .find(className => className.startsWith('animate__'));
                    
                    if (animationClass && !element.classList.contains('animate__animated-visible')) {
                        element.classList.add('animate__animated-visible');
                    }
                }
            });
        };
        
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }

    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.stat-card, .reward-card, .timeline-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }

    function addButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .btn-icon');
        buttons.forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    function handleResponsiveBehavior() {
        if (window.innerWidth > 992) {
            // Remove mobile overlay if exists
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                document.body.removeChild(overlay);
                sidebar?.classList.remove('active');
            }
        }
    }
});