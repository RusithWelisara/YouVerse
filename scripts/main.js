// Main JavaScript functionality for YouVerse website

class YouVerseApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupHeaderScroll();
        this.setupMobileMenu();
        this.setupNewsletterForm();
        this.setupSmoothScrolling();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components after DOM is ready
        this.animateHeroElements();
        this.setupIntersectionObserver();
    }

    setupScrollAnimations() {
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.feature-card, .dashboard-card, .section-header');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
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

    setupHeaderScroll() {
        const header = document.getElementById('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                this.toggleMobileMenuIcon(mobileMenuBtn);
            });

            // Close mobile menu when clicking on links
            const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    this.toggleMobileMenuIcon(mobileMenuBtn);
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    this.toggleMobileMenuIcon(mobileMenuBtn);
                }
            });
        }
    }

    toggleMobileMenuIcon(button) {
        const spans = button.querySelectorAll('span');
        const isActive = button.parentElement.querySelector('.mobile-menu').classList.contains('active');
        
        spans.forEach((span, index) => {
            if (isActive) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    }

    setupNewsletterForm() {
        const form = document.getElementById('newsletterForm');
        const successDiv = document.getElementById('newsletterSuccess');
        
        if (form && successDiv) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = form.querySelector('input[type="email"]').value;
                const submitBtn = form.querySelector('button[type="submit"]');
                
                if (!this.validateEmail(email)) {
                    this.showNotification('Please enter a valid email address', 'error');
                    return;
                }

                // Show loading state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Joining...';
                submitBtn.disabled = true;

                try {
                    // Simulate API call
                    await this.simulateAPICall(1000);
                    
                    // Show success state
                    form.style.display = 'none';
                    successDiv.style.display = 'block';
                    this.showNotification('Successfully subscribed to early access!', 'success');
                    
                } catch (error) {
                    this.showNotification('Something went wrong. Please try again.', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    animateHeroElements() {
        // Animate hero elements with staggered delays
        const heroElements = [
            '.hero-badge',
            '.hero-title',
            '.hero-subtitle',
            '.hero-buttons',
            '.ai-avatar'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    setupIntersectionObserver() {
        // Enhanced intersection observer for better animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation for grid items
                    if (entry.target.parentElement.classList.contains('features-grid') ||
                        entry.target.parentElement.classList.contains('dashboard-grid')) {
                        const siblings = Array.from(entry.target.parentElement.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.feature-card, .dashboard-card, .newsletter-card').forEach(el => {
            observer.observe(el);
        });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    simulateAPICall(delay) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    showNotification(message, type = 'info') {
        // Create and show notification
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

    // Utility method to add loading state to buttons
    setButtonLoading(button, loading = true) {
        if (loading) {
            button.dataset.originalText = button.textContent;
            button.innerHTML = '<span class="loading"></span> Loading...';
            button.disabled = true;
        } else {
            button.textContent = button.dataset.originalText || 'Submit';
            button.disabled = false;
        }
    }

    // Method to handle page transitions (for future SPA functionality)
    navigateTo(url) {
        // For now, just use regular navigation
        window.location.href = url;
    }

    // Method to handle dynamic content loading
    async loadContent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load content');
            return await response.text();
        } catch (error) {
            console.error('Error loading content:', error);
            this.showNotification('Failed to load content', 'error');
            return null;
        }
    }

    // Method to handle form submissions
    async submitForm(form, endpoint) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Submission failed');
            
            return await response.json();
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
    }

    // Method to handle responsive image loading
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Method to handle theme switching (for future dark/light mode)
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Method to initialize theme from localStorage
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// Initialize the application
const app = new YouVerseApp();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YouVerseApp;
}