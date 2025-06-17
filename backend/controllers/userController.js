import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import { generateToken, generateResetToken, hashToken } from '../utils/token.js';

// @desc    Register new user and send email verification
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);
  const verifyUrl = `https://refactored-doodle-64w9jw5wrwq244wr-5000.app.github.dev/api/v1/users/verify-email?token=${token}`;
  const message = `<h2>Verify Your Email</h2><p><a href="${verifyUrl}">Click here to verify your account</a></p>`;

  await sendEmail({
    email: user.email,
    subject: 'Email Verification',
    message
  });

  res.status(201).json({ message: 'User registered. Please verify your email.' });
};

// @desc    Verify email address
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: 'Invalid token' });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

// @desc    Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email before logging in.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id);
  res.status(200).json({ token });
};

// @desc    Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = generateResetToken();
  const hashed = hashToken(resetToken);
  user.resetPasswordToken = hashed;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `http://localhost:5000/api/v1/users/reset-password/${resetToken}`;
  const message = `<h2>Reset Password</h2><p><a href="${resetUrl}">Click here to reset your password</a></p>`;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request',
    message
  });

  res.status(200).json({ message: 'Password reset email sent' });
};

// @desc    Reset password
export const resetPassword = async (req, res) => {
  const hashedToken = hashToken(req.params.token);
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ message: 'Password has been reset' });
};
