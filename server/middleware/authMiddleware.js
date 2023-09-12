// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');

const asyncVerify = promisify(jwt.verify);

async function verifyToken(token) {
  try {
    const decoded = await asyncVerify(token, 'your_secret_key');
    return decoded;
  } catch (error) {
    return null;
  }
}

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  const decoded = await verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  req.user = decoded;
  next();
};
