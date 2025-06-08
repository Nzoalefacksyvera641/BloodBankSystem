document.addEventListener('DOMContentLoaded', function() {
    // Initialize the rewards program
    initializeRewards();
    
    // Set up event listeners
    setupFilterButtons();
    setupModal();
});

function initializeRewards() {
    // Load donor data (in a real app, this would come from an API)
    const donorData = {
        name: "Sarah Johnson",
        memberSince: "Jan 2020",
        totalDonations: 12,
        rewardPoints: 1850,
        nextMilestone: "15 donations",
        pointsToNext: 150,
        progress: 80
    };
    
    // Update donor profile
    document.getElementById('donor-name').textContent = donorData.name;
    document.getElementById('member-since').textContent = donorData.memberSince;
    document.getElementById('total-donations').textContent = donorData.totalDonations;
    document.getElementById('lives-saved').textContent = donorData.totalDonations * 3; // Estimate 3 lives per donation
    document.getElementById('reward-points').textContent = donorData.rewardPoints.toLocaleString();
    document.getElementById('next-milestone').textContent = donorData.nextMilestone;
    document.getElementById('points-to-next').textContent = donorData.pointsToNext;
    document.getElementById('progress-fill').style.width = `${donorData.progress}%`;
    
    // Load rewards (in a real app, this would come from an API)
    const rewards = [
        {
            id: 1,
            title: "Blood Donor T-Shirt",
            description: "Show your donor pride with our exclusive t-shirt",
            points: 500,
            category: "merch",
            availability: "High",
            expiry: "Dec 31, 2024",
            icon: "fas fa-tshirt"
        },
        {
            id: 2,
            title: "$10 Coffee Voucher",
            description: "Enjoy a coffee on us at participating cafes",
            points: 750,
            category: "vouchers",
            availability: "Medium",
            expiry: "Jun 30, 2024",
            icon: "fas fa-coffee"
        },
        {
            id: 3,
            title: "VIP Donor Tour",
            description: "Exclusive behind-the-scenes tour of our blood center",
            points: 1500,
            category: "experiences",
            availability: "Limited",
            expiry: "Mar 15, 2024",
            icon: "fas fa-building"
        },
        {
            id: 4,
            title: "Donor Hoodie",
            description: "Stay warm with our premium quality hoodie",
            points: 1000,
            category: "merch",
            availability: "Medium",
            expiry: "Dec 31, 2024",
            icon: "fas fa-tshirt"
        },
        {
            id: 5,
            title: "Movie Tickets (2x)",
            description: "Enjoy a night out at the movies",
            points: 1200,
            category: "vouchers",
            availability: "High",
            expiry: "Sep 30, 2024",
            icon: "fas fa-ticket-alt"
        },
        {
            id: 6,
            title: "Meet the Team Lunch",
            description: "Lunch with our blood bank staff and hear their stories",
            points: 2000,
            category: "experiences",
            availability: "Limited",
            expiry: "May 1, 2024",
            icon: "fas fa-utensils"
        }
    ];
    
    // Display rewards
    displayRewards(rewards);
    
    // Load activity (in a real app, this would come from an API)
    const activities = [
        {
            id: 1,
            title: "Donation Completed",
            date: new Date(2023, 10, 15),
            points: 150,
            icon: "fas fa-tint"
        },
        {
            id: 2,
            title: "Reward Redeemed",
            description: "Blood Donor T-Shirt",
            date: new Date(2023, 9, 22),
            points: -500,
            icon: "fas fa-gift"
        },
        {
            id: 3,
            title: "Donation Completed",
            date: new Date(2023, 9, 1),
            points: 150,
            icon: "fas fa-tint"
        },
        {
            id: 4,
            title: "Milestone Reached",
            description: "10 Donations - Gold Tier",
            date: new Date(2023, 8, 10),
            points: 500,
            icon: "fas fa-medal"
        }
    ];
    
    // Display activity
    displayActivity(activities);
}

function displayRewards(rewards) {
    const rewardsGrid = document.querySelector('.rewards-grid');
    rewardsGrid.innerHTML = '';
    
    if (rewards.length === 0) {
        rewardsGrid.innerHTML = '<div class="no-rewards">No rewards available</div>';
        return;
    }
    
    rewards.forEach(reward => {
        const rewardCard = document.createElement('div');
        rewardCard.className = 'reward-card';
        rewardCard.dataset.category = reward.category;
        
        rewardCard.innerHTML = `
            <div class="reward-image">
                <i class="${reward.icon}"></i>
            </div>
            <div class="reward-content">
                <h3 class="reward-title">${reward.title}</h3>
                <p class="reward-description">${reward.description}</p>
                <div class="reward-footer">
                    <div class="reward-points">${reward.points} pts</div>
                    <button class="reward-btn" data-reward-id="${reward.id}">Redeem</button>
                </div>
            </div>
        `;
        
        rewardsGrid.appendChild(rewardCard);
    });
    
    // Add event listeners to redeem buttons
    document.querySelectorAll('.reward-btn').forEach(button => {
        button.addEventListener('click', function() {
            const rewardId = parseInt(this.dataset.rewardId);
            openRedeemModal(rewardId);
        });
    });
}

function displayActivity(activities) {
    const activityTimeline = document.querySelector('.activity-timeline');
    
    if (activities.length === 0) {
        activityTimeline.innerHTML = '<div class="empty-activity">No recent activity yet</div>';
        return;
    }
    
    // Clear existing activities (except the empty message if present)
    activityTimeline.innerHTML = '';
    
    // Sort activities by date (newest first)
    activities.sort((a, b) => b.date - a.date);
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const dateString = activity.date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-details">
                <div class="activity-title">${activity.title}</div>
                ${activity.description ? `<div class="activity-description">${activity.description}</div>` : ''}
                <div class="activity-date">${dateString}</div>
            </div>
            <div class="activity-points" style="color: ${activity.points > 0 ? '#d32f2f' : '#388e3c'}">
                ${activity.points > 0 ? '+' : ''}${activity.points} pts
            </div>
        `;
        
        activityTimeline.appendChild(activityItem);
    });
}

function setupFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter rewards
            const filter = this.dataset.filter;
            const rewardCards = document.querySelectorAll('.reward-card');
            
            rewardCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function setupModal() {
    const modal = document.getElementById('redeem-modal');
    const closeButton = document.querySelector('.modal-close');
    
    // Close modal when clicking close button
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Confirm redeem button
    document.getElementById('confirm-redeem').addEventListener('click', function() {
        const emailInput = document.getElementById('redeem-email');
        const email = emailInput.value.trim();
        
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            emailInput.style.borderColor = '#f44336';
            return;
        }
        
        // In a real app, this would submit to an API
        const rewardId = parseInt(this.dataset.rewardId);
        
        // Show success message
        alert('Reward redemption request submitted! You will receive a confirmation email shortly.');
        
        // Close modal
        modal.classList.remove('active');
    });
}

function openRedeemModal(rewardId) {
    // In a real app, this would fetch reward details from an API
    // For demo, we'll use mock data
    const rewards = [
        {
            id: 1,
            title: "Blood Donor T-Shirt",
            description: "Show your donor pride with our exclusive t-shirt. Available in sizes S-XXL. Please specify your size in the notes when redeeming.",
            points: 500,
            availability: "High",
            expiry: "Dec 31, 2024",
            icon: "fas fa-tshirt"
        },
        {
            id: 2,
            title: "$10 Coffee Voucher",
            description: "Enjoy a coffee on us at participating cafes. Valid at over 100 locations nationwide.",
            points: 750,
            availability: "Medium",
            expiry: "Jun 30, 2024",
            icon: "fas fa-coffee"
        },
        {
            id: 3,
            title: "VIP Donor Tour",
            description: "Exclusive behind-the-scenes tour of our blood center. Learn how your donations help save lives. Tours available on select Fridays.",
            points: 1500,
            availability: "Limited",
            expiry: "Mar 15, 2024",
            icon: "fas fa-building"
        },
        {
            id: 4,
            title: "Donor Hoodie",
            description: "Stay warm with our premium quality hoodie. Available in black or red, sizes S-XXL.",
            points: 1000,
            availability: "Medium",
            expiry: "Dec 31, 2024",
            icon: "fas fa-tshirt"
        },
        {
            id: 5,
            title: "Movie Tickets (2x)",
            description: "Enjoy a night out at the movies. Valid at all major theater chains.",
            points: 1200,
            availability: "High",
            expiry: "Sep 30, 2024",
            icon: "fas fa-ticket-alt"
        },
        {
            id: 6,
            title: "Meet the Team Lunch",
            description: "Lunch with our blood bank staff and hear their stories. Available on the first Wednesday of each month.",
            points: 2000,
            availability: "Limited",
            expiry: "May 1, 2024",
            icon: "fas fa-utensils"
        }
    ];
    
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;
    
    // Update modal content
    document.getElementById('modal-reward-title').textContent = reward.title;
    document.getElementById('modal-reward-description').textContent = reward.description;
    document.getElementById('modal-reward-points').textContent = `${reward.points} pts`;
    document.getElementById('modal-reward-availability').textContent = reward.availability;
    document.getElementById('modal-reward-expiry').textContent = reward.expiry;
    
    const rewardImage = document.getElementById('modal-reward-image');
    rewardImage.innerHTML = `<i class="${reward.icon}"></i>`;
    
    // Set reward ID on confirm button
    document.getElementById('confirm-redeem').dataset.rewardId = reward.id;
    
    // Reset email input
    document.getElementById('redeem-email').value = '';
    document.getElementById('redeem-email').style.borderColor = '#ddd';
    
    // Open modal
    document.getElementById('redeem-modal').classList.add('active');
}