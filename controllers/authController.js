
/**
 * Authentication Controller
 * Handles all authentication logic with Supabase integration
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateSignup, validateLogin } = require('../utils/validateInput');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// In-memory user store for fallback (replace with actual database in production)
const users = [];

/**
 * Generate JWT token
 */
const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

/**
 * Sign up new user
 */
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Validate input
    const validation = validateSignup({ email, password, firstName, lastName });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    if (supabase) {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      // Generate our own JWT for API access
      const token = generateToken(data.user.id, data.user.email);

      res.status(201).json({
        success: true,
        message: 'User created successfully. Please check your email to verify your account.',
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.user_metadata.first_name,
          lastName: data.user.user_metadata.last_name,
          emailVerified: data.user.email_confirmed_at !== null
        },
        token
      });

    } else {
      // Fallback to local authentication
      console.log('Supabase not configured, using local fallback');
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        firstName,
        lastName,
        emailVerified: false,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);

      // Generate token
      const token = generateToken(newUser.id, newUser.email);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          emailVerified: newUser.emailVerified
        },
        token
      });
    }

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during signup'
    });
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    if (supabase) {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate our own JWT for API access
      const token = generateToken(data.user.id, data.user.email);

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.user_metadata.first_name,
          lastName: data.user.user_metadata.last_name,
          emailVerified: data.user.email_confirmed_at !== null
        },
        token
      });

    } else {
      // Fallback to local authentication
      console.log('Supabase not configured, using local fallback');
      
      // Find user
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate token
      const token = generateToken(user.id, user.email);

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified
        },
        token
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
};

/**
 * Get current user info
 */
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (supabase) {
      // Get user from Supabase
      const { data, error } = await supabase.auth.admin.getUserById(userId);

      if (error || !data.user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.user_metadata.first_name,
          lastName: data.user.user_metadata.last_name,
          emailVerified: data.user.email_confirmed_at !== null,
          createdAt: data.user.created_at
        }
      });

    } else {
      // Get user from local store
      const user = users.find(u => u.id === userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt
        }
      });
    }

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Logout user
 */
const logout = async (req, res) => {
  try {
    if (supabase) {
      // Supabase logout (optional, since we're using JWT)
      await supabase.auth.signOut();
    }

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout'
    });
  }
};

/**
 * Refresh JWT token
 */
const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    // Verify the old token (even if expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    
    // Generate new token
    const newToken = generateToken(decoded.userId, decoded.email);

    res.json({
      success: true,
      token: newToken
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser,
  logout,
  refreshToken
};
