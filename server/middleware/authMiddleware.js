const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model or whatever you use for user data

const SECRET_KEY = process.env.SECRET_KEY || '0';

module.exports = async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(decoded.id); // Assuming you have a User model with an 'id' field
    if (!user) {
      return res.status(401).json({ error: 'User not found, please re-register' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
