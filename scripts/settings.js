// Settings page functionality
class SettingsManager {
    constructor() {
        this.currentSection = 'profile';
        this.isLoading = false;
        this.settings = this.loadSettings();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormHandlers();
        this.setupThemeSelector();
        this.setupToggleSwitches();
        this.loadUserData();
        this.updateCurrentDate();
    }

    loadSettings() {
        // Load settings from localStorage
        const defaultSettings = {
            theme: 'dark',
            language: 'en',
            timezone: 'UTC-8',
            notifications: {
                email: {
                    account: true,
                    clone: true,
                    marketing: false
                },
                push: {
                    browser: true,
                    mobile: true
                }
            },
            privacy: {
                publicProfile: true,
                showEmail: false,
                analytics: true,
                personalization: true
            },
            twoFactor: false
        };

        try {
            const saved = localStorage.getItem('dupliverse_settings');
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch (error) {
            console.error('Failed to load settings:', error);
            return defaultSettings;
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('dupliverse_settings', JSON.stringify(this.settings));
            this.showNotification('Settings saved successfully', 'success');
        } catch (error) {
            console.error('Failed to save settings:', error);
            this.showNotification('Failed to save settings', 'error');
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchSection(e.target.dataset.section));
        });

        // Profile picture upload
        document.getElementById('uploadPictureBtn').addEventListener('click', () => {
            document.getElementById('profilePictureInput').click();
        });

        document.getElementById('profilePictureInput').addEventListener('change', (e) => {
            this.handleProfilePictureUpload(e);
        });

        document.getElementById('removePictureBtn').addEventListener('click', () => {
            this.removeProfilePicture();
        });

        // Theme selector
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectTheme(e.target.dataset.theme));
        });

        // Toggle switches
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            toggle.addEventListener('change', (e) => this.handleToggleChange(e));
        });

        // Select dropdowns
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.settings.language = e.target.value;
            this.saveSettings();
        });

        document.getElementById('timezoneSelect').addEventListener('change', (e) => {
            this.settings.timezone = e.target.value;
            this.saveSettings();
        });

        // Action buttons
        document.getElementById('deleteAccountBtn').addEventListener('click', () => this.handleDeleteAccount());
        document.getElementById('exportDataBtn').addEventListener('click', () => this.exportUserData());
    }

    setupFormHandlers() {
        // Profile form
        document.getElementById('profileForm').addEventListener('submit', (e) => this.handleProfileUpdate(e));
        
        // Password form
        document.getElementById('passwordForm').addEventListener('submit', (e) => this.handlePasswordChange(e));

        // Cancel buttons
        document.getElementById('cancelProfileBtn').addEventListener('click', () => this.resetProfileForm());
    }

    setupThemeSelector() {
        // Set initial theme
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-theme="${this.settings.theme}"]`).classList.add('active');
        
        // Apply theme
        this.applyTheme(this.settings.theme);
    }

    setupToggleSwitches() {
        // Set initial toggle states
        document.getElementById('twoFactorToggle').checked = this.settings.twoFactor;
        document.getElementById('emailAccountToggle').checked = this.settings.notifications.email.account;
        document.getElementById('emailCloneToggle').checked = this.settings.notifications.email.clone;
        document.getElementById('emailMarketingToggle').checked = this.settings.notifications.email.marketing;
        document.getElementById('pushBrowserToggle').checked = this.settings.notifications.push.browser;
        document.getElementById('pushMobileToggle').checked = this.settings.notifications.push.mobile;
        document.getElementById('publicProfileToggle').checked = this.settings.privacy.publicProfile;
        document.getElementById('showEmailToggle').checked = this.settings.privacy.showEmail;
        document.getElementById('analyticsToggle').checked = this.settings.privacy.analytics;
        document.getElementById('personalizationToggle').checked = this.settings.privacy.personalization;
    }

    switchSection(sectionName) {
        if (this.isLoading || !sectionName) return;
        
        this.currentSection = sectionName;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.settings-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}Section`).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async handleProfileUpdate(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const formData = new FormData(e.target);
        const profileData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            bio: formData.get('bio')
        };
        
        this.setLoadingState('saveProfileBtn', true);
        
        try {
            // Simulate API call
            await this.simulateAPICall();
            
            // Update UI
            this.showNotification('Profile updated successfully', 'success');
            
        } catch (error) {
            console.error('Profile update failed:', error);
            this.showNotification('Failed to update profile', 'error');
        } finally {
            this.setLoadingState('saveProfileBtn', false);
        }
    }

    async handlePasswordChange(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const formData = new FormData(e.target);
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmNewPassword');
        
        // Validate passwords
        if (newPassword !== confirmPassword) {
            this.showNotification('New passwords do not match', 'error');
            return;
        }
        
        if (newPassword.length < 8) {
            this.showNotification('Password must be at least 8 characters long', 'error');
            return;
        }
        
        this.setLoadingState('passwordForm', true);
        
        try {
            // Simulate API call
            await this.simulateAPICall();
            
            // Clear form
            e.target.reset();
            
            this.showNotification('Password updated successfully', 'success');
            
        } catch (error) {
            console.error('Password change failed:', error);
            this.showNotification('Failed to update password', 'error');
        } finally {
            this.setLoadingState('passwordForm', false);
        }
    }

    handleProfilePictureUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select a valid image file', 'error');
            return;
        }
        
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('Image size must be less than 5MB', 'error');
            return;
        }
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('profileImage').src = e.target.result;
            this.showNotification('Profile picture updated', 'success');
        };
        reader.readAsDataURL(file);
    }

    removeProfilePicture() {
        // Reset to default avatar
        document.getElementById('profileImage').src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2';
        this.showNotification('Profile picture removed', 'success');
    }

    selectTheme(theme) {
        this.settings.theme = theme;
        this.saveSettings();
        
        // Update UI
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
        
        // Apply theme
        this.applyTheme(theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme-specific styles
        if (theme === 'light') {
            document.documentElement.style.setProperty('--bg-primary', '#ffffff');
            document.documentElement.style.setProperty('--bg-secondary', '#f8fafc');
            document.documentElement.style.setProperty('--text-primary', '#1e293b');
            document.documentElement.style.setProperty('--text-secondary', '#475569');
        } else if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg-primary', '#020617');
            document.documentElement.style.setProperty('--bg-secondary', '#0f172a');
            document.documentElement.style.setProperty('--text-primary', '#f8fafc');
            document.documentElement.style.setProperty('--text-secondary', '#cbd5e1');
        } else if (theme === 'system') {
            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.applyTheme(prefersDark ? 'dark' : 'light');
        }
    }

    handleToggleChange(e) {
        const toggle = e.target;
        const toggleId = toggle.id;
        const isChecked = toggle.checked;
        
        // Update settings based on toggle
        switch (toggleId) {
            case 'twoFactorToggle':
                this.settings.twoFactor = isChecked;
                if (isChecked) {
                    this.showNotification('Two-factor authentication enabled', 'success');
                } else {
                    this.showNotification('Two-factor authentication disabled', 'info');
                }
                break;
                
            case 'emailAccountToggle':
                this.settings.notifications.email.account = isChecked;
                break;
                
            case 'emailCloneToggle':
                this.settings.notifications.email.clone = isChecked;
                break;
                
            case 'emailMarketingToggle':
                this.settings.notifications.email.marketing = isChecked;
                break;
                
            case 'pushBrowserToggle':
                this.settings.notifications.push.browser = isChecked;
                if (isChecked) {
                    this.requestNotificationPermission();
                }
                break;
                
            case 'pushMobileToggle':
                this.settings.notifications.push.mobile = isChecked;
                break;
                
            case 'publicProfileToggle':
                this.settings.privacy.publicProfile = isChecked;
                break;
                
            case 'showEmailToggle':
                this.settings.privacy.showEmail = isChecked;
                break;
                
            case 'analyticsToggle':
                this.settings.privacy.analytics = isChecked;
                break;
                
            case 'personalizationToggle':
                this.settings.privacy.personalization = isChecked;
                break;
        }
        
        this.saveSettings();
    }

    async requestNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.showNotification('Browser notifications enabled', 'success');
            } else {
                this.showNotification('Notification permission denied', 'warning');
                document.getElementById('pushBrowserToggle').checked = false;
                this.settings.notifications.push.browser = false;
                this.saveSettings();
            }
        }
    }

    async handleDeleteAccount() {
        const confirmed = confirm(
            'Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data.'
        );
        
        if (!confirmed) return;
        
        const doubleConfirmed = prompt(
            'To confirm account deletion, please type "DELETE" in all caps:'
        );
        
        if (doubleConfirmed !== 'DELETE') {
            this.showNotification('Account deletion cancelled', 'info');
            return;
        }
        
        try {
            // Simulate API call
            await this.simulateAPICall();
            
            // Clear all data
            localStorage.clear();
            
            this.showNotification('Account deleted successfully', 'success');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        } catch (error) {
            console.error('Account deletion failed:', error);
            this.showNotification('Failed to delete account', 'error');
        }
    }

    exportUserData() {
        const userData = {
            profile: {
                firstName: document.getElementById('profileFirstName').value,
                lastName: document.getElementById('profileLastName').value,
                email: document.getElementById('profileEmail').value,
                phone: document.getElementById('profilePhone').value,
                bio: document.getElementById('profileBio').value
            },
            settings: this.settings,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dupliverse-user-data.json';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        this.showNotification('User data exported successfully', 'success');
    }

    resetProfileForm() {
        // Reset form to original values
        this.loadUserData();
        this.showNotification('Changes discarded', 'info');
    }

    loadUserData() {
        // Load user data from localStorage or API
        const userData = {
            firstName: 'Alex',
            lastName: 'Parker',
            email: 'thisisparker@gmail.com',
            phone: '+1 (555) 123-4567',
            bio: 'AI enthusiast and digital transformation advocate. Building the future of human-AI collaboration.'
        };
        
        // Populate form fields
        document.getElementById('profileFirstName').value = userData.firstName;
        document.getElementById('profileLastName').value = userData.lastName;
        document.getElementById('profileEmail').value = userData.email;
        document.getElementById('profilePhone').value = userData.phone;
        document.getElementById('profileBio').value = userData.bio;
        
        // Set select values
        document.getElementById('languageSelect').value = this.settings.language;
        document.getElementById('timezoneSelect').value = this.settings.timezone;
    }

    updateCurrentDate() {
        // Update any date displays
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        // Update any date elements if they exist
        document.querySelectorAll('.current-date').forEach(element => {
            element.textContent = now.toLocaleDateString('en-US', options);
        });
    }

    setLoadingState(elementId, loading) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        this.isLoading = loading;
        
        if (loading) {
            if (element.tagName === 'BUTTON') {
                element.classList.add('loading');
                element.disabled = true;
            } else if (element.tagName === 'FORM') {
                element.classList.add('loading');
                const submitBtn = element.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                }
            }
        } else {
            if (element.tagName === 'BUTTON') {
                element.classList.remove('loading');
                element.disabled = false;
            } else if (element.tagName === 'FORM') {
                element.classList.remove('loading');
                const submitBtn = element.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
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
            case 'warning':
                notification.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
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

    async simulateAPICall() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate occasional failures for testing
        if (Math.random() < 0.05) {
            throw new Error('Network error occurred');
        }
        
        return { success: true };
    }
}

// Initialize settings manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const settings = new SettingsManager();
    
    // Make settings instance globally available for debugging
    window.settingsManager = settings;
});