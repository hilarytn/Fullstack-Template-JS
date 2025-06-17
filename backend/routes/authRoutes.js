import express from 'express';
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

const router = express.Router();

// Email/password
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshAccessToken);

// Email verification
router.get('/verify-email', verifyEmail);

// Forgot/reset password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Google OAuth2
router.get('/google', googleAuthRedirect);
router.get('/google/callback', googleAuthCallback);

export default router;