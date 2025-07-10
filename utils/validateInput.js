
/**
 * Input Validation Utilities
 * Comprehensive validation for user inputs
 */

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password strength validation
 * Minimum 8 characters, at least one letter and one number
 */
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

/**
 * Validate signup input
 */
const validateSignup = ({ email, password, firstName, lastName }) => {
  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (!passwordRegex.test(password)) {
    errors.push('Password must contain at least one letter and one number');
  }

  // First name validation
  if (!firstName) {
    errors.push('First name is required');
  } else if (firstName.length < 2) {
    errors.push('First name must be at least 2 characters long');
  } else if (firstName.length > 50) {
    errors.push('First name must be less than 50 characters');
  }

  // Last name validation
  if (!lastName) {
    errors.push('Last name is required');
  } else if (lastName.length < 2) {
    errors.push('Last name must be at least 2 characters long');
  } else if (lastName.length > 50) {
    errors.push('Last name must be less than 50 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate login input
 */
const validateLogin = ({ email, password }) => {
  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize user input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML characters
    .substring(0, 1000); // Limit length
};

/**
 * Validate and sanitize user profile update
 */
const validateProfileUpdate = (updates) => {
  const errors = [];
  const sanitized = {};

  // First name
  if (updates.firstName !== undefined) {
    const firstName = sanitizeInput(updates.firstName);
    if (firstName.length < 2 || firstName.length > 50) {
      errors.push('First name must be between 2 and 50 characters');
    } else {
      sanitized.firstName = firstName;
    }
  }

  // Last name
  if (updates.lastName !== undefined) {
    const lastName = sanitizeInput(updates.lastName);
    if (lastName.length < 2 || lastName.length > 50) {
      errors.push('Last name must be between 2 and 50 characters');
    } else {
      sanitized.lastName = lastName;
    }
  }

  // Bio
  if (updates.bio !== undefined) {
    const bio = sanitizeInput(updates.bio);
    if (bio.length > 500) {
      errors.push('Bio must be less than 500 characters');
    } else {
      sanitized.bio = bio;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized
  };
};

module.exports = {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  sanitizeInput
};
