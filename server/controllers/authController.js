const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: '24h', // Adjust as needed
    });

    // Set an auth_token cookie on the client side (httpOnly: false, secure: true, SameSite: Lax)
    res.cookie('auth_token', token, { httpOnly: false, secure: true, sameSite: 'Lax', maxAge: 86400000 }); // 24 hours

    res.json({ token });
  } catch (error) {
    console.error('An error occurred during registration:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // Delay the response to make it harder to guess whether the username exists
      // await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(401).json({ error: 'Invalid credentialsxxy' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // Delay the response to make it harder to guess whether the password is incorrect
      // await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(401).json({ error: 'Invalid credentialsxxx' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: '24h', // Adjust as needed
    });

    // Set an auth_token cookie on the client side (httpOnly: false, secure: true, SameSite: Lax)
    res.cookie('auth_token', token, { httpOnly: false, secure: true, sameSite: 'Lax', maxAge: 86400000 }); // 24 hours

    res.json({ token });
  } catch (error) {
    console.error('An error occurred during login:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.logout = (req, res) => {
  // Clear the auth_token cookie on the client side
  res.clearCookie('auth_token');

  res.json({ message: 'Logout successful' });
};
