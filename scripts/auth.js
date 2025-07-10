// Authentication functionality with Supabase integration
class AuthenticationSystem {
    constructor() {
        this.currentTab = 'signin';
        this.isLoading = false;
        this.supabase = null; // Will be initialized when Supabase is available
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupPasswordToggles();
        this.setupPasswordStrength();
        this.setupFormValidation();
        this.initializeSupabase();
    }

    async initializeSupabase() {
        // Initialize Supabase client (placeholder for actual implementation)
        try {
            // This would be replaced with actual Supabase initialization
            console.log('Supabase client would be initialized here');
            
            // Check for existing session
            this.checkExistingSession();
        } catch (error) {
            console.error('Failed to initialize Supabase:', error);
        }
    }

    checkExistingSession() {
        // Check if user is already logged in
        const token = localStorage.getItem('auth_token');
        if (token) {
            // Redirect to dashboard if already authenticated
            window.location.href = 'dashboard.html';
        }
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('resetPasswordForm').addEventListener('submit', (e) => this.handlePasswordReset(e));

        // Social authentication
        document.getElementById('googleSignIn').addEventListener('click', () => this.handleSocialAuth('google', 'signin'));
        document.getElementById('githubSignIn').addEventListener('click', () => this.handleSocialAuth('github', 'signin'));
        document.getElementById('googleSignUp').addEventListener('click', () => this.handleSocialAuth('google', 'signup'));
        document.getElementById('githubSignUp').addEventListener('click', () => this.handleSocialAuth('github', 'signup'));

        // Forgot password
        document.getElementById('forgotPasswordBtn').addEventListener('click', () => this.switchTab('forgot'));
        document.getElementById('backToSignIn').addEventListener('click', () => this.switchTab('signin'));

        // Real-time validation
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    setupPasswordToggles() {
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const input = toggle.parentElement.querySelector('input');
                const eyeOpen = toggle.querySelector('.eye-open');
                const eyeClosed = toggle.querySelector('.eye-closed');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    eyeOpen.style.display = 'none';
                    eyeClosed.style.display = 'block';
                } else {
                    input.type = 'password';
                    eyeOpen.style.display = 'block';
                    eyeClosed.style.display = 'none';
                }
            });
        });
    }

    setupPasswordStrength() {
        const passwordInput = document.getElementById('registerPassword');
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');

        if (passwordInput && strengthBar && strengthText) {
            passwordInput.addEventListener('input', (e) => {
                const password = e.target.value;
                const strength = this.calculatePasswordStrength(password);
                
                strengthBar.className = `strength-fill ${strength.level}`;
                strengthText.textContent = `Password strength: ${strength.text}`;
            });
        }
    }

    calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        const levels = {
            0: { level: 'weak', text: 'Very weak' },
            1: { level: 'weak', text: 'Weak' },
            2: { level: 'fair', text: 'Fair' },
            3: { level: 'good', text: 'Good' },
            4: { level: 'strong', text: 'Strong' },
            5: { level: 'strong', text: 'Very strong' }
        };
        
        return levels[score] || levels[0];
    }

    setupFormValidation() {
        // Custom validation rules
        this.validationRules = {
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            password: {
                required: true,
                minLength: 8,
                message: 'Password must be at least 8 characters long'
            },
            firstName: {
                required: true,
                minLength: 2,
                message: 'First name must be at least 2 characters long'
            },
            lastName: {
                required: true,
                minLength: 2,
                message: 'Last name must be at least 2 characters long'
            }
        };
    }

    switchTab(tabName) {
        if (this.isLoading) return;
        
        this.currentTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        
        const targetForm = {
            'signin': 'signinForm',
            'signup': 'signupForm',
            'forgot': 'forgotPasswordForm'
        }[tabName];
        
        document.getElementById(targetForm).classList.add('active');
        
        // Clear any existing errors
        this.clearAllErrors();
        
        // Focus first input
        setTimeout(() => {
            const firstInput = document.querySelector(`#${targetForm} input`);
            if (firstInput) firstInput.focus();
        }, 100);
    }

    async handleLogin(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');
        
        // Validate form
        if (!this.validateLoginForm(email, password)) {
            return;
        }
        
        this.setLoadingState('loginSubmitBtn', true);
        
        try {
            // Simulate API call (replace with actual Supabase auth)
            await this.simulateAuthRequest();
            
            // Store auth token
            localStorage.setItem('auth_token', 'demo-token-' + Date.now());
            if (remember) {
                localStorage.setItem('remember_me', 'true');
            }
            
            this.showMessage('success', 'Welcome back!', 'You have been successfully signed in.');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } catch (error) {
            console.error('Login failed:', error);
            this.showMessage('error', 'Sign In Failed', error.message || 'Please check your credentials and try again.');
        } finally {
            this.setLoadingState('loginSubmitBtn', false);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const formData = new FormData(e.target);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const agreeTerms = formData.get('agreeTerms');
        
        // Validate form
        if (!this.validateRegisterForm(firstName, lastName, email, password, confirmPassword, agreeTerms)) {
            return;
        }
        
        this.setLoadingState('registerSubmitBtn', true);
        
        try {
            // Simulate API call (replace with actual Supabase auth)
            await this.simulateAuthRequest();
            
            this.showMessage('success', 'Account Created!', 'Please check your email to verify your account.');
            
            // Switch to sign in tab
            setTimeout(() => {
                this.switchTab('signin');
                document.getElementById('loginEmail').value = email;
            }, 2000);
            
        } catch (error) {
            console.error('Registration failed:', error);
            this.showMessage('error', 'Registration Failed', error.message || 'Please try again.');
        } finally {
            this.setLoadingState('registerSubmitBtn', false);
        }
    }

    async handlePasswordReset(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        
        // Validate email
        if (!this.validateField(document.getElementById('resetEmail'))) {
            return;
        }
        
        this.setLoadingState('resetSubmitBtn', true);
        
        try {
            // Simulate API call (replace with actual Supabase auth)
            await this.simulateAuthRequest();
            
            this.showMessage('success', 'Reset Link Sent!', 'Please check your email for password reset instructions.');
            
            // Switch back to sign in
            setTimeout(() => {
                this.switchTab('signin');
            }, 2000);
            
        } catch (error) {
            console.error('Password reset failed:', error);
            this.showMessage('error', 'Reset Failed', error.message || 'Please try again.');
        } finally {
            this.setLoadingState('resetSubmitBtn', false);
        }
    }

    async handleSocialAuth(provider, action) {
        if (this.isLoading) return;
        
        try {
            this.isLoading = true;
            
            // Simulate social auth (replace with actual Supabase social auth)
            await this.simulateAuthRequest();
            
            // Store auth token
            localStorage.setItem('auth_token', `${provider}-token-` + Date.now());
            
            this.showMessage('success', 'Success!', `You have been signed ${action === 'signin' ? 'in' : 'up'} with ${provider}.`);
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } catch (error) {
            console.error('Social auth failed:', error);
            this.showMessage('error', 'Authentication Failed', `Failed to ${action} with ${provider}. Please try again.`);
        } finally {
            this.isLoading = false;
        }
    }

    validateLoginForm(email, password) {
        let isValid = true;
        
        if (!email || !this.validationRules.email.pattern.test(email)) {
            this.showFieldError('loginEmailError', this.validationRules.email.message);
            isValid = false;
        }
        
        if (!password || password.length < this.validationRules.password.minLength) {
            this.showFieldError('loginPasswordError', this.validationRules.password.message);
            isValid = false;
        }
        
        return isValid;
    }

    validateRegisterForm(firstName, lastName, email, password, confirmPassword, agreeTerms) {
        let isValid = true;
        
        if (!firstName || firstName.length < this.validationRules.firstName.minLength) {
            this.showFieldError('firstNameError', this.validationRules.firstName.message);
            isValid = false;
        }
        
        if (!lastName || lastName.length < this.validationRules.lastName.minLength) {
            this.showFieldError('lastNameError', this.validationRules.lastName.message);
            isValid = false;
        }
        
        if (!email || !this.validationRules.email.pattern.test(email)) {
            this.showFieldError('registerEmailError', this.validationRules.email.message);
            isValid = false;
        }
        
        if (!password || password.length < this.validationRules.password.minLength) {
            this.showFieldError('registerPasswordError', this.validationRules.password.message);
            isValid = false;
        }
        
        if (password !== confirmPassword) {
            this.showFieldError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        if (!agreeTerms) {
            this.showFieldError('agreeTermsError', 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const name = input.name;
        const rule = this.validationRules[name];
        
        if (!rule) return true;
        
        this.clearFieldError(input);
        
        if (rule.required && !value) {
            this.showFieldError(input.id + 'Error', `${name} is required`);
            return false;
        }
        
        if (rule.pattern && value && !rule.pattern.test(value)) {
            this.showFieldError(input.id + 'Error', rule.message);
            return false;
        }
        
        if (rule.minLength && value && value.length < rule.minLength) {
            this.showFieldError(input.id + 'Error', rule.message);
            return false;
        }
        
        return true;
    }

    showFieldError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            
            // Add error class to form group
            const formGroup = errorElement.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('error');
            }
        }
    }

    clearFieldError(input) {
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.classList.remove('show');
            
            // Remove error class from form group
            const formGroup = errorElement.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('error');
            }
        }
    }

    clearAllErrors() {
        document.querySelectorAll('.field-error').forEach(error => {
            error.classList.remove('show');
        });
        
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
    }

    setLoadingState(buttonId, loading) {
        const button = document.getElementById(buttonId);
        if (!button) return;
        
        this.isLoading = loading;
        
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showMessage(type, title, message) {
        const messageElement = document.getElementById('authMessage');
        const titleElement = messageElement.querySelector('.message-title');
        const textElement = messageElement.querySelector('.message-text');
        
        messageElement.className = `auth-message ${type}`;
        titleElement.textContent = title;
        textElement.textContent = message;
        
        messageElement.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
        
        // Click to dismiss
        messageElement.onclick = () => {
            messageElement.style.display = 'none';
        };
    }

    handleKeyboardNavigation(e) {
        // Tab navigation between forms
        if (e.key === 'Tab' && e.ctrlKey) {
            e.preventDefault();
            const tabs = ['signin', 'signup'];
            const currentIndex = tabs.indexOf(this.currentTab);
            const nextIndex = (currentIndex + 1) % tabs.length;
            this.switchTab(tabs[nextIndex]);
        }
        
        // Escape to close messages
        if (e.key === 'Escape') {
            const messageElement = document.getElementById('authMessage');
            if (messageElement.style.display === 'block') {
                messageElement.style.display = 'none';
            }
        }
    }

    async simulateAuthRequest() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate occasional failures for testing
        if (Math.random() < 0.1) {
            throw new Error('Network error occurred');
        }
        
        return { success: true };
    }

    // Supabase integration methods (to be implemented)
    async signInWithSupabase(email, password) {
        // Implementation for Supabase sign in
        console.log('Supabase sign in:', email);
    }

    async signUpWithSupabase(email, password, metadata) {
        // Implementation for Supabase sign up
        console.log('Supabase sign up:', email, metadata);
    }

    async signInWithProvider(provider) {
        // Implementation for Supabase social auth
        console.log('Supabase social auth:', provider);
    }

    async resetPasswordWithSupabase(email) {
        // Implementation for Supabase password reset
        console.log('Supabase password reset:', email);
    }
}

// Initialize authentication system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const auth = new AuthenticationSystem();
    
    // Make auth instance globally available for debugging
    window.authSystem = auth;
});