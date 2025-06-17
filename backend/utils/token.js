import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const generateResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashed = hashToken(rawToken);
  return { rawToken, hashed };
};

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15m' // or '10m' based on your desired lifespan
  });
};


export const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

