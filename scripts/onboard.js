// Onboarding functionality
class OnboardingFlow {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {
            firstName: '',
            lastName: '',
            email: '',
            avatar: 'professional',
            voice: 'natural',
            personality: 'friendly'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.previousStep());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());

        // Form inputs
        document.getElementById('firstName').addEventListener('input', (e) => {
            this.formData.firstName = e.target.value;
        });
        
        document.getElementById('lastName').addEventListener('input', (e) => {
            this.formData.lastName = e.target.value;
        });
        
        document.getElementById('email').addEventListener('input', (e) => {
            this.formData.email = e.target.value;
        });

        // Avatar selection
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', () => this.selectAvatar(option));
        });

        // Voice selection
        document.querySelectorAll('[data-voice]').forEach(option => {
            option.addEventListener('click', () => this.selectVoice(option));
        });

        // Personality selection
        document.querySelectorAll('[data-personality]').forEach(option => {
            option.addEventListener('click', () => this.selectPersonality(option));
        });
    }

    selectAvatar(option) {
        // Remove active class from all options
        document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('active'));
        
        // Add active class to selected option
        option.classList.add('active');
        
        // Update form data
        this.formData.avatar = option.dataset.avatar;
        
        // Update preview image
        const img = option.querySelector('img');
        document.getElementById('selectedAvatar').src = img.src;
    }

    selectVoice(option) {
        // Remove active class from all voice options
        document.querySelectorAll('[data-voice]').forEach(opt => opt.classList.remove('active'));
        
        // Add active class to selected option
        option.classList.add('active');
        
        // Update form data
        this.formData.voice = option.dataset.voice;
    }

    selectPersonality(option) {
        // Remove active class from all personality options
        document.querySelectorAll('[data-personality]').forEach(opt => opt.classList.remove('active'));
        
        // Add active class to selected option
        option.classList.add('active');
        
        // Update form data
        this.formData.personality = option.dataset.personality;
    }

    async nextStep() {
        if (!this.validateCurrentStep()) {
            return;
        }

        const nextBtn = document.getElementById('nextBtn');
        const originalText = nextBtn.querySelector('#nextBtnText').textContent;
        
        // Show loading state
        nextBtn.classList.add('loading');
        nextBtn.disabled = true;

        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 500));

            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateUI();
            } else {
                // Complete onboarding
                await this.completeOnboarding();
            }
        } catch (error) {
            console.error('Error proceeding to next step:', error);
            this.showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Remove loading state
            nextBtn.classList.remove('loading');
            nextBtn.disabled = false;
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                const firstName = document.getElementById('firstName').value.trim();
                const lastName = document.getElementById('lastName').value.trim();
                const email = document.getElementById('email').value.trim();
                
                if (!firstName) {
                    this.showNotification('Please enter your first name', 'error');
                    document.getElementById('firstName').focus();
                    return false;
                }
                
                if (!lastName) {
                    this.showNotification('Please enter your last name', 'error');
                    document.getElementById('lastName').focus();
                    return false;
                }
                
                if (!email || !this.validateEmail(email)) {
                    this.showNotification('Please enter a valid email address', 'error');
                    document.getElementById('email').focus();
                    return false;
                }
                
                return true;
                
            case 2:
            case 3:
                return true; // Avatar, voice, and personality have defaults
                
            case 4:
                return true;
                
            default:
                return true;
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateUI() {
        // Update step indicator
        document.getElementById('currentStep').textContent = this.currentStep;
        
        // Update progress bar
        const progress = (this.currentStep / this.totalSteps) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        
        // Update step items
        document.querySelectorAll('.step-item').forEach((item, index) => {
            const stepNumber = index + 1;
            item.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                item.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                item.classList.add('completed');
            }
        });
        
        // Update step content
        document.querySelectorAll('.step-form').forEach((form, index) => {
            form.classList.remove('active');
            if (index + 1 === this.currentStep) {
                form.classList.add('active');
            }
        });
        
        // Update step title and description
        const stepData = this.getStepData(this.currentStep);
        document.getElementById('stepTitle').textContent = stepData.title;
        document.getElementById('stepDescription').textContent = stepData.description;
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const nextBtnText = document.getElementById('nextBtnText');
        
        prevBtn.disabled = this.currentStep === 1;
        
        if (this.currentStep === this.totalSteps) {
            nextBtnText.textContent = 'Complete Setup';
            this.updateSummary();
        } else {
            nextBtnText.textContent = 'Next';
        }
    }

    getStepData(step) {
        const steps = {
            1: { title: 'Personal Information', description: 'Tell us about yourself' },
            2: { title: 'Avatar Customization', description: 'Create your digital identity' },
            3: { title: 'Voice & Personality', description: 'Define your AI characteristics' },
            4: { title: 'Complete Setup', description: 'Finalize your YouVerse profile' }
        };
        
        return steps[step] || steps[1];
    }

    updateSummary() {
        // Update summary with current form data
        const fullName = `${this.formData.firstName} ${this.formData.lastName}`.trim() || 'Not provided';
        
        document.getElementById('summaryName').textContent = fullName;
        document.getElementById('summaryEmail').textContent = this.formData.email || 'Not provided';
        document.getElementById('summaryVoice').textContent = this.formData.voice;
        document.getElementById('summaryPersonality').textContent = this.formData.personality;
    }

    async completeOnboarding() {
        try {
            // Simulate API call to create user profile
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Welcome to YouVerse! Your AI clone is being created.', 'success');
            
            // Redirect to dashboard after a delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error completing onboarding:', error);
            this.showNotification('Failed to complete setup. Please try again.', 'error');
            throw error;
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

    // Method to save progress to localStorage
    saveProgress() {
        localStorage.setItem('youverse_onboarding', JSON.stringify({
            currentStep: this.currentStep,
            formData: this.formData
        }));
    }

    // Method to load progress from localStorage
    loadProgress() {
        const saved = localStorage.getItem('youverse_onboarding');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.currentStep = data.currentStep || 1;
                this.formData = { ...this.formData, ...data.formData };
                
                // Populate form fields
                if (this.formData.firstName) {
                    document.getElementById('firstName').value = this.formData.firstName;
                }
                if (this.formData.lastName) {
                    document.getElementById('lastName').value = this.formData.lastName;
                }
                if (this.formData.email) {
                    document.getElementById('email').value = this.formData.email;
                }
                
                this.updateUI();
            } catch (error) {
                console.error('Error loading saved progress:', error);
            }
        }
    }

    // Method to clear saved progress
    clearProgress() {
        localStorage.removeItem('youverse_onboarding');
    }
}

// Initialize onboarding flow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const onboarding = new OnboardingFlow();
    
    // Save progress on form changes
    ['firstName', 'lastName', 'email'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => onboarding.saveProgress());
        }
    });
    
    // Load any saved progress
    onboarding.loadProgress();
});