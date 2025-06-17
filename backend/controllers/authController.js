import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import { generateAccessToken, generateRefreshToken, generateResetToken, hashToken } from '../utils/token.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password });
  const token = generateAccessToken(user._id);
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const message = `<h2>Verify Your Email</h2><p><a href="${verifyUrl}">Click to verify</a></p>`;
  await sendEmail({ email: user.email, subject: 'Email Verification', message });
  res.status(201).json({ message: 'User registered. Please verify your email.' });
};

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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.isVerified) {
    return res.status(403).json({ message: 'Invalid or unverified user' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user._id);
  const rawRefreshToken = generateRefreshToken();
  const refreshToken = hashToken(rawRefreshToken);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({ accessToken });
};

export const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({ refreshToken});
  if (user) {
    user.refreshToken = null;
    await user.save();
  }
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict', secure: true });
  res.sendStatus(200);
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
  
  const user = await User.findOne({ refreshToken});
  if (!user) return res.status(403).json({ message: 'Invalid refresh token' });
  const accessToken = generateAccessToken(user._id);
  res.status(200).json({ accessToken });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const resetToken = generateResetToken();
  const hashed = hashToken(resetToken);
  user.resetPasswordToken = hashed;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `<h2>Reset Password</h2><p><a href="${resetUrl}">Click to reset</a></p>`;
  await sendEmail({ email: user.email, subject: 'Password Reset', message });
  res.status(200).json({ message: 'Password reset email sent' });
};

export const resetPassword = async (req, res) => {
  const hashedToken = hashToken(req.params.token);
  const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({ message: 'Password has been reset' });
};
