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
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Hilary Titus
 *         email:
 *           type: string
 *           format: email
 *           example: hilary@example.com
 *         password:
 *           type: string
 *           example: password123
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: hilary@example.com
 *         password:
 *           type: string
 *           example: password123
 *     ForgotPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: hilary@example.com
 *     ResetPassword:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           example: newStrongPassword
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', validate(registerSchema), registerUser);

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Email verified
 */
router.get('/verify-email', verifyEmail);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validate(loginSchema), loginUser);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', protect, logoutUser);

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.post('/refresh-token', refreshAccessToken);

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);

/**
 * @swagger
 * /api/v1/auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

/**
 * @swagger
 * /api/v1/auth/google:
 *   get:
 *     summary: Google OAuth redirect
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect to Google
 */
router.get('/google', googleAuthRedirect);

/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login via Google successful
 */
router.get('/google/callback', googleAuthCallback);

export default router;