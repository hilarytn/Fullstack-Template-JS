import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword
} from '../controllers/userController.js';

import validate from '../middlewares/validate.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../validations/userValidation.js';

const router = express.Router();

/**
 * @route   POST /api/v1/users/register
 * @desc    Register a new user
 */
router.post('/register', validate(registerSchema), registerUser);

/**
 * @route   GET /api/v1/users/verify-email
 * @desc    Verify user email
 */
router.get('/verify-email', verifyEmail);

/**
 * @route   POST /api/v1/users/login
 * @desc    Login user
 */
router.post('/login',  validate(loginSchema), loginUser);

/**
 * @route   POST /api/v1/users/forgot-password
 * @desc    Send password reset email
 */
router.post('/forgot-password', protect, validate(forgotPasswordSchema), forgotPassword);

/**
 * @route   POST /api/v1/users/reset-password/:token
 * @desc    Reset password
 */
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

export default router;