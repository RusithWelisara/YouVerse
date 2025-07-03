// Partners page functionality
class PartnersPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormHandling();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Partnership form submission
        const form = document.getElementById('partnershipForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Tier selection buttons
        document.querySelectorAll('.tier-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTierSelection(e));
        });

        // Hero CTA buttons
        document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleHeroCTA(e));
        });
    }

    setupFormHandling() {
        // Real-time form validation
        const form = document.getElementById('partnershipForm');
        if (form) {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    setupAnimations() {
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.benefit-card, .pricing-card, .application-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for grid items
                    if (entry.target.parentElement.classList.contains('benefits-grid') ||
                        entry.target.parentElement.classList.contains('pricing-grid')) {
                        const siblings = Array.from(entry.target.parentElement.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            observer.observe(el);
        });
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }

        // Show loading state
        this.setFormLoading(form, true);

        try {
            // Simulate API call
            await this.submitPartnershipApplication(data);
            
            // Show success state
            this.showSuccessMessage();
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to submit application. Please try again.', 'error');
        } finally {
            this.setFormLoading(form, false);
        }
    }

    async submitPartnershipApplication(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true, id: Date.now() });
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value && !this.validateEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }

        // Phone validation (basic)
        if (field.type === 'tel' && value && !this.validatePhone(value)) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
        `;
        
        field.parentElement.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setFormLoading(form, loading) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const submitBtnText = document.getElementById('submitBtnText');
        
        if (loading) {
            form.classList.add('loading');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            if (submitBtnText) {
                submitBtnText.textContent = 'Submitting...';
            }
        } else {
            form.classList.remove('loading');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            if (submitBtnText) {
                submitBtnText.textContent = 'Submit Application';
            }
        }
    }

    showSuccessMessage() {
        // Hide form and show success message
        const form = document.getElementById('partnershipForm');
        const applicationCard = document.querySelector('.application-card');
        
        if (form && applicationCard) {
            form.style.display = 'none';
            
            // Create success content
            const successContent = document.createElement('div');
            successContent.className = 'application-success show';
            successContent.innerHTML = `
                <div class="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                </div>
                <h3>Application Submitted!</h3>
                <p>Thank you for your interest in partnering with YouVerse. Our team will review your application and get back to you within 24 hours.</p>
            `;
            
            applicationCard.appendChild(successContent);
        }

        this.showNotification('Partnership application submitted successfully!', 'success');
    }

    handleTierSelection(e) {
        const button = e.target;
        const card = button.closest('.pricing-card');
        const tierName = card.querySelector('.tier-name').textContent;
        
        // Update form with selected tier
        const tierSelect = document.getElementById('preferredTier');
        if (tierSelect) {
            const tierValue = tierName.toLowerCase();
            tierSelect.value = tierValue;
        }

        // Scroll to application form
        const applicationSection = document.querySelector('.application-section');
        if (applicationSection) {
            applicationSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Highlight selected tier temporarily
        card.style.transform = 'scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
        }, 1000);
    }

    handleHeroCTA(e) {
        const button = e.target.closest('.btn');
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('Become a Partner')) {
            // Scroll to application form
            const applicationSection = document.querySelector('.application-section');
            if (applicationSection) {
                applicationSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else if (buttonText.includes('Download')) {
            // Simulate download
            this.simulateDownload();
        }
    }

    simulateDownload() {
        // Create a temporary download link
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,YouVerse Partnership Guide\n\nThank you for your interest in partnering with YouVerse!\n\nThis guide contains information about our partnership program, integration options, and benefits.\n\nFor more information, please contact our partnership team.';
        link.download = 'youverse-partnership-guide.txt';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Partnership guide downloaded successfully!', 'success');
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

    // Method to handle pricing card interactions
    setupPricingInteractions() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('popular')) {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('popular')) {
                    card.style.transform = '';
                }
            });
        });
    }

    // Method to handle benefit card animations
    setupBenefitAnimations() {
        const benefitCards = document.querySelectorAll('.benefit-card');
        
        benefitCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.benefit-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.benefit-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    }
}

// Initialize partners page functionality
document.addEventListener('DOMContentLoaded', () => {
    const partnersPage = new PartnersPage();
    partnersPage.setupPricingInteractions();
    partnersPage.setupBenefitAnimations();
});