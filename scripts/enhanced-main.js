// Enhanced main JavaScript functionality for DupliVerse website
class EnhancedDupliVerseApp {
    constructor() {
        this.isLoading = false;
        this.notifications = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupHeaderScroll();
        this.setupMobileMenu();
        this.setupNewsletterForm();
        this.setupSmoothScrolling();
        this.enhanceButtonFunctionality();
        this.setupLoadingAnimations();
        this.setupAccessibility();
        this.setupPerformanceOptimizations();
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

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.showNotification('Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('Connection lost', 'warning');
        });
    }

    initializeComponents() {
        this.animateHeroElements();
        this.setupIntersectionObserver();
        this.setupLazyLoading();
        this.preloadCriticalResources();
    }

    enhanceButtonFunctionality() {
        // Enhance all buttons with proper functionality
        document.querySelectorAll('button, .btn').forEach(button => {
            this.enhanceButton(button);
        });

        // Setup specific button handlers
        this.setupSpecificButtonHandlers();
    }

    enhanceButton(button) {
        // Skip if already enhanced
        if (button.dataset.enhanced) return;
        
        // Add loading state capability
        if (!button.querySelector('.btn-loading')) {
            const loadingElement = document.createElement('div');
            loadingElement.className = 'btn-loading';
            loadingElement.style.display = 'none';
            loadingElement.innerHTML = '<div class="loading-spinner"></div>';
            button.appendChild(loadingElement);
        }

        // Add ripple effect
        button.addEventListener('click', (e) => {
            this.createRippleEffect(e, button);
        });

        // Add keyboard accessibility
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });

        // Add focus management
        button.addEventListener('focus', () => {
            button.classList.add('focused');
        });

        button.addEventListener('blur', () => {
            button.classList.remove('focused');
        });

        // Mark as enhanced
        button.dataset.enhanced = 'true';
    }

    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        ripple.className = 'ripple-effect';
        
        // Ensure button has relative positioning
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    setupSpecificButtonHandlers() {
        // Get Early Access buttons
        document.querySelectorAll('.btn:contains("Get Early Access"), .btn:contains("Join Waitlist")').forEach(btn => {
            btn.addEventListener('click', () => this.handleEarlyAccess());
        });

        // Watch Demo buttons
        document.querySelectorAll('.btn:contains("Watch Demo")').forEach(btn => {
            btn.addEventListener('click', () => this.handleWatchDemo());
        });

        // Dashboard buttons
        document.querySelectorAll('.btn:contains("Dashboard"), a[href*="dashboard"]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDashboardAccess(e));
        });

        // Settings buttons
        document.querySelectorAll('.btn:contains("Settings"), a[href*="settings"]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSettingsAccess(e));
        });

        // Notification buttons
        document.querySelectorAll('.btn:contains("Notifications"), #notificationsBtn').forEach(btn => {
            btn.addEventListener('click', () => this.handleNotifications());
        });

        // Social media buttons
        document.querySelectorAll('.social-link, .social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLink(e));
        });
    }

    async handleEarlyAccess() {
        this.showNotification('Redirecting to early access signup...', 'info');
        
        // Scroll to newsletter section if it exists
        const newsletterSection = document.querySelector('.newsletter');
        if (newsletterSection) {
            newsletterSection.scrollIntoView({ behavior: 'smooth' });
            
            // Focus on email input
            setTimeout(() => {
                const emailInput = newsletterSection.querySelector('input[type="email"]');
                if (emailInput) {
                    emailInput.focus();
                }
            }, 1000);
        } else {
            // Redirect to auth page
            window.location.href = 'auth.html';
        }
    }

    handleWatchDemo() {
        this.showNotification('Demo video coming soon!', 'info');
        
        // Could open a modal with demo video
        this.openDemoModal();
    }

    openDemoModal() {
        // Create demo modal
        const modal = document.createElement('div');
        modal.className = 'demo-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>DupliVerse Demo</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="demo-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5,3 19,12 5,21 5,3"></polygon>
                            </svg>
                            <p>Demo video will be available soon!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Style the modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(4px);
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeModal();
            }
        });

        // Escape key to close
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Animate in
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    handleDashboardAccess(e) {
        // Check if user is authenticated
        const isAuthenticated = localStorage.getItem('auth_token');
        
        if (!isAuthenticated) {
            e.preventDefault();
            this.showNotification('Please sign in to access the dashboard', 'warning');
            
            // Redirect to auth page
            setTimeout(() => {
                window.location.href = 'auth.html';
            }, 1500);
        } else {
            this.showNotification('Loading dashboard...', 'info');
        }
    }

    handleSettingsAccess(e) {
        // Check if user is authenticated
        const isAuthenticated = localStorage.getItem('auth_token');
        
        if (!isAuthenticated) {
            e.preventDefault();
            this.showNotification('Please sign in to access settings', 'warning');
            
            // Redirect to auth page
            setTimeout(() => {
                window.location.href = 'auth.html';
            }, 1500);
        } else {
            this.showNotification('Loading settings...', 'info');
        }
    }

    handleNotifications() {
        // Toggle notifications panel
        this.showNotification('No new notifications', 'info');
        
        // Could open a notifications panel
        this.openNotificationsPanel();
    }

    openNotificationsPanel() {
        // Create notifications panel
        const panel = document.createElement('div');
        panel.className = 'notifications-panel';
        panel.innerHTML = `
            <div class="panel-header">
                <h4>Notifications</h4>
                <button class="panel-close">&times;</button>
            </div>
            <div class="panel-content">
                <div class="notification-item">
                    <div class="notification-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22,4 12,14.01 9,11.01"></polyline>
                        </svg>
                    </div>
                    <div class="notification-content">
                        <p>Welcome to DupliVerse!</p>
                        <span>Just now</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div class="notification-content">
                        <p>Your AI clone is learning</p>
                        <span>2 hours ago</span>
                    </div>
                </div>
            </div>
        `;

        // Position and style the panel
        panel.style.cssText = `
            position: fixed;
            top: 5rem;
            right: 1rem;
            width: 20rem;
            max-height: 24rem;
            background: var(--glass-bg);
            backdrop-filter: blur(16px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius);
            box-shadow: var(--shadow-xl);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(panel);

        // Animate in
        setTimeout(() => {
            panel.style.transform = 'translateX(0)';
        }, 10);

        // Close panel functionality
        const closePanel = () => {
            panel.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (panel.parentNode) {
                    panel.parentNode.removeChild(panel);
                }
            }, 300);
        };

        panel.querySelector('.panel-close').addEventListener('click', closePanel);

        // Auto-close after 5 seconds
        setTimeout(closePanel, 5000);
    }

    handleSocialLink(e) {
        e.preventDefault();
        
        const platform = this.detectSocialPlatform(e.target);
        this.showNotification(`Opening ${platform}...`, 'info');
        
        // Simulate social media link
        setTimeout(() => {
            this.showNotification(`${platform} link coming soon!`, 'info');
        }, 1000);
    }

    detectSocialPlatform(element) {
        const href = element.href || '';
        const text = element.textContent.toLowerCase();
        
        if (href.includes('twitter') || text.includes('twitter')) return 'Twitter';
        if (href.includes('github') || text.includes('github')) return 'GitHub';
        if (href.includes('linkedin') || text.includes('linkedin')) return 'LinkedIn';
        if (href.includes('facebook') || text.includes('facebook')) return 'Facebook';
        if (href.includes('instagram') || text.includes('instagram')) return 'Instagram';
        
        return 'Social Media';
    }

    setupLoadingAnimations() {
        // Create skeleton loading components
        this.createSkeletonLoaders();
        
        // Setup loading states for forms
        this.setupFormLoadingStates();
        
        // Setup page transition loading
        this.setupPageTransitions();
    }

    createSkeletonLoaders() {
        // Add skeleton loading CSS if not already present
        if (!document.querySelector('#skeleton-styles')) {
            const style = document.createElement('style');
            style.id = 'skeleton-styles';
            style.textContent = `
                .skeleton {
                    background: linear-gradient(90deg, var(--bg-tertiary) 25%, rgba(255, 255, 255, 0.1) 50%, var(--bg-tertiary) 75%);
                    background-size: 200% 100%;
                    animation: skeleton-loading 1.5s infinite;
                    border-radius: 4px;
                }
                
                @keyframes skeleton-loading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                
                .skeleton-text {
                    height: 1rem;
                    margin-bottom: 0.5rem;
                }
                
                .skeleton-title {
                    height: 1.5rem;
                    width: 60%;
                    margin-bottom: 1rem;
                }
                
                .skeleton-avatar {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                }
                
                .skeleton-button {
                    height: 2.5rem;
                    width: 8rem;
                    border-radius: var(--radius);
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupFormLoadingStates() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                this.setFormLoading(form, true);
                
                // Auto-remove loading state after 5 seconds (fallback)
                setTimeout(() => {
                    this.setFormLoading(form, false);
                }, 5000);
            });
        });
    }

    setFormLoading(form, loading) {
        const submitButton = form.querySelector('button[type="submit"], .btn[type="submit"]');
        
        if (loading) {
            form.classList.add('loading');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.classList.add('loading');
            }
        } else {
            form.classList.remove('loading');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }
        }
    }

    setupPageTransitions() {
        // Intercept navigation for smooth transitions
        document.querySelectorAll('a[href]').forEach(link => {
            if (link.href.includes(window.location.origin) && !link.href.includes('#')) {
                link.addEventListener('click', (e) => {
                    this.handlePageTransition(e, link.href);
                });
            }
        });
    }

    handlePageTransition(e, href) {
        // Skip if external link or special cases
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        if (href.includes('mailto:') || href.includes('tel:')) return;
        
        e.preventDefault();
        
        // Show loading indicator
        this.showPageLoader();
        
        // Simulate page load delay
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    }

    showPageLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(loader);
        
        // Animate in
        setTimeout(() => {
            loader.style.opacity = '1';
        }, 10);
    }

    setupAccessibility() {
        // Add skip navigation link
        this.addSkipNavigation();
        
        // Enhance keyboard navigation
        this.enhanceKeyboardNavigation();
        
        // Add ARIA labels where missing
        this.addAriaLabels();
        
        // Setup focus management
        this.setupFocusManagement();
    }

    addSkipNavigation() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-nav';
        
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID if not present
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }
    }

    enhanceKeyboardNavigation() {
        // Add keyboard navigation for custom components
        document.addEventListener('keydown', (e) => {
            // Tab navigation improvements
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
            
            // Escape key handling
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    handleTabNavigation(e) {
        // Ensure focus is visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    handleEscapeKey() {
        // Close any open modals or panels
        const modals = document.querySelectorAll('.demo-modal, .notifications-panel');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });
    }

    addAriaLabels() {
        // Add ARIA labels to buttons without text
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            const icon = button.querySelector('svg');
            const text = button.textContent.trim();
            
            if (!text && icon) {
                // Try to determine button purpose from context
                if (button.classList.contains('mobile-menu-btn')) {
                    button.setAttribute('aria-label', 'Toggle mobile menu');
                } else if (button.classList.contains('password-toggle')) {
                    button.setAttribute('aria-label', 'Toggle password visibility');
                } else {
                    button.setAttribute('aria-label', 'Button');
                }
            }
        });
        
        // Add ARIA labels to form inputs
        document.querySelectorAll('input:not([aria-label]):not([id])').forEach(input => {
            const placeholder = input.placeholder;
            if (placeholder) {
                input.setAttribute('aria-label', placeholder);
            }
        });
    }

    setupFocusManagement() {
        // Trap focus in modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.querySelector('.demo-modal:not([style*="display: none"])');
                if (modal) {
                    this.trapFocus(e, modal);
                }
            }
        });
    }

    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    setupPerformanceOptimizations() {
        // Debounce scroll events
        this.setupDebouncedScrolling();
        
        // Lazy load images
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup service worker if available
        this.setupServiceWorker();
    }

    setupDebouncedScrolling() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(() => {
                this.handleOptimizedScroll();
            }, 16); // ~60fps
        }, { passive: true });
    }

    handleOptimizedScroll() {
        // Optimized scroll handling
        const scrollY = window.scrollY;
        
        // Update header state
        const header = document.getElementById('header');
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Update scroll progress if needed
        this.updateScrollProgress();
    }

    updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.width = `${Math.min(progress, 100)}%`;
        }
    }

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
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }

    preloadCriticalResources() {
        // Preload critical CSS
        const criticalCSS = ['styles/main.css'];
        
        criticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
        
        // Preload critical images
        const criticalImages = [
            'images/logo_bg_removed.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden
            this.pauseAnimations();
        } else {
            // Page is visible
            this.resumeAnimations();
        }
    }

    pauseAnimations() {
        document.querySelectorAll('.loading-spinner, .skeleton').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        document.querySelectorAll('.loading-spinner, .skeleton').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }

    showNotification(message, type = 'info', options = {}) {
        const notification = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date(),
            ...options
        };
        
        this.notifications.push(notification);
        this.renderNotification(notification);
        
        // Auto-remove after delay
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, options.duration || 3000);
        
        return notification.id;
    }

    renderNotification(notification) {
        const element = document.createElement('div');
        element.className = `notification notification-${notification.type}`;
        element.dataset.id = notification.id;
        element.textContent = notification.message;
        
        // Style the notification
        Object.assign(element.style, {
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
            wordWrap: 'break-word',
            cursor: 'pointer'
        });

        // Set background color based on type
        const colors = {
            success: 'linear-gradient(135deg, #10b981, #059669)',
            error: 'linear-gradient(135deg, #ef4444, #dc2626)',
            warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
            info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        };
        
        element.style.background = colors[notification.type] || colors.info;

        // Stack notifications
        const existingNotifications = document.querySelectorAll('.notification');
        const offset = existingNotifications.length * 70;
        element.style.top = `${20 + offset}px`;

        document.body.appendChild(element);

        // Animate in
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 100);

        // Click to dismiss
        element.addEventListener('click', () => {
            this.removeNotification(notification.id);
        });
    }

    removeNotification(id) {
        const element = document.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (element.parentElement) {
                    element.parentElement.removeChild(element);
                }
            }, 300);
        }
        
        // Remove from array
        this.notifications = this.notifications.filter(n => n.id !== id);
        
        // Reposition remaining notifications
        this.repositionNotifications();
    }

    repositionNotifications() {
        const elements = document.querySelectorAll('.notification');
        elements.forEach((element, index) => {
            element.style.top = `${20 + (index * 70)}px`;
        });
    }

    // Legacy methods for compatibility
    setupScrollAnimations() {
        // Enhanced scroll animations with performance optimizations
        const animateElements = document.querySelectorAll('.feature-card, .dashboard-card, .section-header');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for grid items
                    if (entry.target.parentElement.classList.contains('features-grid') ||
                        entry.target.parentElement.classList.contains('dashboard-grid')) {
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

    setupHeaderScroll() {
        // Already handled in setupDebouncedScrolling
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
                this.setFormLoading(form, true);

                try {
                    // Simulate API call
                    await this.simulateAPICall(1000);
                    
                    // Show success state
                    form.style.display = 'none';
                    successDiv.style.display = 'block';
                    this.showNotification('Successfully subscribed to early access!', 'success');
                    
                } catch (error) {
                    this.showNotification('Something went wrong. Please try again.', 'error');
                } finally {
                    this.setFormLoading(form, false);
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
}

// Initialize the enhanced application
const app = new EnhancedDupliVerseApp();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedDupliVerseApp;
}

// Add enhanced CSS for new features
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    /* Enhanced button styles */
    .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
    }
    
    .btn:active {
        transform: translateY(0);
    }
    
    .btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .btn-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: inherit;
    }
    
    .loading-spinner {
        width: 1rem;
        height: 1rem;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    /* Ripple effect */
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Focus styles for keyboard navigation */
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-blue);
        outline-offset: 2px;
    }
    
    /* Modal styles */
    .modal-content {
        background: var(--glass-bg);
        backdrop-filter: blur(16px);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        padding: 2rem;
        max-width: 32rem;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0.25rem;
        line-height: 1;
    }
    
    .demo-placeholder {
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
    }
    
    .demo-placeholder svg {
        width: 4rem;
        height: 4rem;
        margin-bottom: 1rem;
    }
    
    /* Notifications panel */
    .notifications-panel {
        padding: 1.5rem;
    }
    
    .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--glass-border);
    }
    
    .panel-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0.25rem;
        line-height: 1;
    }
    
    .notification-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .notification-item:last-child {
        border-bottom: none;
    }
    
    .notification-icon {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: var(--primary-blue);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .notification-icon svg {
        width: 1rem;
        height: 1rem;
        color: white;
    }
    
    .notification-content p {
        margin: 0 0 0.25rem 0;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .notification-content span {
        font-size: 0.75rem;
        color: var(--text-muted);
    }
    
    /* Scroll progress bar */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
        z-index: 1001;
        transition: width 0.1s ease;
    }
    
    /* Enhanced form loading states */
    .form.loading {
        position: relative;
        pointer-events: none;
    }
    
    .form.loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
        border-radius: inherit;
    }
    
    /* Accessibility improvements */
    .skip-nav:focus {
        position: absolute !important;
        top: 6px !important;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .btn:hover {
            transform: none;
        }
        
        .loading-spinner {
            animation: none;
            border-top-color: transparent;
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .btn {
            border: 2px solid currentColor;
        }
        
        .notification {
            border: 2px solid white;
        }
    }
`;

document.head.appendChild(enhancedStyles);