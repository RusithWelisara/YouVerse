// Dashboard functionality
class Dashboard {
    constructor() {
        this.charts = {};
        this.data = {
            earnings: [
                { month: 'Jan', value: 4.20 },
                { month: 'Feb', value: 6.80 },
                { month: 'Mar', value: 8.50 },
                { month: 'Apr', value: 12.80 }
            ],
            activity: [
                { day: 'Mon', interactions: 24, earnings: 2.40 },
                { day: 'Tue', interactions: 32, earnings: 3.20 },
                { day: 'Wed', interactions: 28, earnings: 2.80 },
                { day: 'Thu', interactions: 45, earnings: 4.50 },
                { day: 'Fri', interactions: 38, earnings: 3.80 },
                { day: 'Sat', interactions: 52, earnings: 5.20 },
                { day: 'Sun', interactions: 41, earnings: 4.10 }
            ]
        };
        
        this.init();
    }

    init() {
        this.updateCurrentDate();
        this.setupCharts();
        this.setupEventListeners();
        this.animateStats();
        this.setupRealTimeUpdates();
    }

    updateCurrentDate() {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    setupCharts() {
        this.createEarningsChart();
        this.createActivityChart();
    }

    createEarningsChart() {
        const canvas = document.getElementById('earningsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = this.data.earnings;
        
        // Set canvas size
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
        
        // Chart dimensions
        const padding = 40;
        const chartWidth = canvas.offsetWidth - (padding * 2);
        const chartHeight = canvas.offsetHeight - (padding * 2);
        
        // Find max value for scaling
        const maxValue = Math.max(...data.map(d => d.value));
        const scale = chartHeight / maxValue;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        // Set styles
        ctx.strokeStyle = '#3b82f6';
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, padding, 0, canvas.offsetHeight - padding);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        // Draw area
        ctx.beginPath();
        ctx.moveTo(padding, canvas.offsetHeight - padding);
        
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            const y = canvas.offsetHeight - padding - (point.value * scale);
            
            if (index === 0) {
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.lineTo(padding + chartWidth, canvas.offsetHeight - padding);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw line
        ctx.beginPath();
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            const y = canvas.offsetHeight - padding - (point.value * scale);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#3b82f6';
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            const y = canvas.offsetHeight - padding - (point.value * scale);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw labels
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            ctx.fillText(point.month, x, canvas.offsetHeight - 10);
        });
    }

    createActivityChart() {
        const canvas = document.getElementById('activityChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = this.data.activity;
        
        // Set canvas size
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
        
        // Chart dimensions
        const padding = 40;
        const chartWidth = canvas.offsetWidth - (padding * 2);
        const chartHeight = canvas.offsetHeight - (padding * 2);
        
        // Find max values for scaling
        const maxInteractions = Math.max(...data.map(d => d.interactions));
        const maxEarnings = Math.max(...data.map(d => d.earnings));
        const interactionsScale = chartHeight / maxInteractions;
        const earningsScale = chartHeight / maxEarnings;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        // Draw interactions line
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            const y = canvas.offsetHeight - padding - (point.interactions * interactionsScale);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw earnings line
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            const y = canvas.offsetHeight - padding - (point.earnings * earningsScale);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw points for interactions
        ctx.fillStyle = '#8b5cf6';
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            const y = canvas.offsetHeight - padding - (point.interactions * interactionsScale);
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw points for earnings
        ctx.fillStyle = '#10b981';
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            const y = canvas.offsetHeight - padding - (point.earnings * earningsScale);
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw labels
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        data.forEach((point, index) => {
            const x = padding + (index * (chartWidth / (data.length - 1)));
            ctx.fillText(point.day, x, canvas.offsetHeight - 10);
        });
    }

    setupEventListeners() {
        // Resize charts on window resize
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.setupCharts();
            }, 100);
        });

        // Button interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleButtonClick(e));
        });

        // Card hover effects
        document.querySelectorAll('.stat-card, .chart-card, .info-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.handleCardHover(card, true));
            card.addEventListener('mouseleave', () => this.handleCardHover(card, false));
        });
    }

    handleButtonClick(e) {
        const button = e.target.closest('.btn');
        const buttonText = button.textContent.trim();
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Handle specific button actions
        if (buttonText.includes('Customize Clone')) {
            this.showNotification('Clone customization coming soon!', 'info');
        } else if (buttonText.includes('View All Activity')) {
            this.showNotification('Activity history coming soon!', 'info');
        } else if (buttonText.includes('Notifications')) {
            this.showNotification('No new notifications', 'info');
        } else if (buttonText.includes('Settings')) {
            this.showNotification('Settings panel coming soon!', 'info');
        }
    }

    handleCardHover(card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
        }
    }

    animateStats() {
        // Animate stat values on load
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach(stat => {
            const finalValue = stat.textContent;
            const isNumber = !isNaN(parseFloat(finalValue.replace(/[^0-9.-]+/g, '')));
            
            if (isNumber) {
                const numericValue = parseFloat(finalValue.replace(/[^0-9.-]+/g, ''));
                const prefix = finalValue.replace(/[0-9.-]+/g, '');
                
                this.animateNumber(stat, 0, numericValue, 1000, prefix);
            }
        });
        
        // Animate progress bars
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const finalWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = finalWidth;
            }, 500);
        });
    }

    animateNumber(element, start, end, duration, prefix = '') {
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeOut;
            
            if (prefix.includes('$')) {
                element.textContent = `$${current.toFixed(2)}`;
            } else if (prefix.includes('%')) {
                element.textContent = `${Math.round(current)}%`;
            } else {
                element.textContent = `${Math.round(current)}${prefix}`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    setupRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateActivityFeed();
        }, 30000);
        
        // Update time every minute
        setInterval(() => {
            this.updateCurrentDate();
        }, 60000);
    }

    updateActivityFeed() {
        const activities = [
            'AI interaction completed',
            'Profile viewed',
            'New connection made',
            'Skill assessment completed',
            'Achievement unlocked'
        ];
        
        const earnings = ['+$0.15', '+$0.25', '+$0.10', '+$0.30', '+$1.00'];
        
        // Add new activity item
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const randomEarning = Math.random() > 0.5 ? earnings[Math.floor(Math.random() * earnings.length)] : null;
            
            const newActivity = document.createElement('div');
            newActivity.className = 'activity-item';
            newActivity.style.opacity = '0';
            newActivity.style.transform = 'translateY(-10px)';
            
            newActivity.innerHTML = `
                <div class="activity-indicator activity-success"></div>
                <div class="activity-content">
                    <p class="activity-text">${randomActivity}</p>
                    <p class="activity-time">Just now</p>
                </div>
                ${randomEarning ? `<div class="activity-value">${randomEarning}</div>` : ''}
            `;
            
            activityList.insertBefore(newActivity, activityList.firstChild);
            
            // Animate in
            setTimeout(() => {
                newActivity.style.opacity = '1';
                newActivity.style.transform = 'translateY(0)';
            }, 100);
            
            // Remove oldest item if more than 3
            const items = activityList.querySelectorAll('.activity-item');
            if (items.length > 3) {
                const lastItem = items[items.length - 1];
                lastItem.style.opacity = '0';
                lastItem.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    if (lastItem.parentElement) {
                        lastItem.parentElement.removeChild(lastItem);
                    }
                }, 300);
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Method to refresh dashboard data
    async refreshData() {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update charts with new data
            this.setupCharts();
            
            this.showNotification('Dashboard data refreshed', 'success');
        } catch (error) {
            console.error('Error refreshing data:', error);
            this.showNotification('Failed to refresh data', 'error');
        }
    }

    // Method to export dashboard data
    exportData() {
        const data = {
            earnings: this.data.earnings,
            activity: this.data.activity,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'youverse-dashboard-data.json';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        this.showNotification('Dashboard data exported', 'success');
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'r':
                    e.preventDefault();
                    dashboard.refreshData();
                    break;
                case 'e':
                    e.preventDefault();
                    dashboard.exportData();
                    break;
            }
        }
    });
});