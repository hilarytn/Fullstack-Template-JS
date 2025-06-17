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


