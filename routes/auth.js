
/**
 * Authentication Routes
 * Handles all authentication-related endpoints
 */

const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/signup - Register new user
router.post('/signup', authController.signup);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// GET /api/auth/me - Get current user info (protected route)
router.get('/me', authenticateToken, authController.getCurrentUser);

// POST /api/auth/logout - Logout user (optional)
router.post('/logout', authenticateToken, authController.logout);

// POST /api/auth/refresh - Refresh JWT token
router.post('/refresh', authController.refreshToken);

module.exports = router;
