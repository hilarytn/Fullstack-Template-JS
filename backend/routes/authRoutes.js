// 📁 routes/authRoutes.js
import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  verifyEmail
} from '../controllers/authController.js';

import {
  googleAuthRedirect,
  googleAuthCallback
} from '../controllers/googleController.js';

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../validations/userValidation.js';

const router = express.Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 */
router.post('/register', validate(registerSchema), registerUser);

/**
 * @route   GET /api/v1/auth/verify-email
 * @desc    Verify user email
 */
router.get('/verify-email', verifyEmail);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 */
router.post('/login', validate(loginSchema), loginUser);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 */
router.post('/logout', protect, logoutUser);

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Refresh access token
 */
router.post('/refresh-token', refreshAccessToken);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Forgot password
 */
router.post('/forgot-password', protect, validate(forgotPasswordSchema), forgotPassword);

/**
 * @route   POST /api/v1/auth/reset-password/:token
 * @desc    Reset password
 */
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

/**
 * @route   GET /api/v1/auth/google
 * @desc    Google OAuth redirect
 */
router.get('/google', googleAuthRedirect);

/**
 * @route   GET /api/v1/auth/google/callback
 * @desc    Google OAuth callback
 */
router.get('/google/callback', googleAuthCallback);

export default router;
