const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY || '0';

const passwordStrengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const allowedGenders = ["ชาย", "หญิง"];
const allowedRoles = ["ซื้อ", "ขาย"];
const minimumAge = 13; // Minimum age requirement

exports.register = async (req, res) => {
  try {
    const { username, password, email, postalCode, dateOfBirth, gender, role } = req.body;

    // Check if any of the required parameters is null or empty
    if (!username || !password || !email || !postalCode || !dateOfBirth || !gender || !role) {
      return res.status(400).json({ error: 'All registration fields are required' });
    }

    // Calculate the user's age based on the provided date of birth
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the user's age meets the minimum age requirement
    if (age < minimumAge) {
      return res.status(400).json({ error: `You must be at least ${minimumAge} years old to register` });
    }

    // Check if the user already exists with the given username
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Check if the user already exists with the given email
    const existingEmailUser = await User.findOne({ where: { email } });
    if (existingEmailUser) {
      return res.status(409).json({ error: 'Email address already exists' });
    }

    // Check if the password meets the strength criteria
    if (!passwordStrengthRegex.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter.' });
    }

    // Check if the gender is one of the allowed values
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({ error: 'Invalid gender value' });
    }

    // Check if the role is one of the allowed values
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role value' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      postalCode,
      dateOfBirth,
      gender,
      role,
    });

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
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Delay the response to make it harder to guess whether the username exists
      // await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // Delay the response to make it harder to guess whether the password is incorrect
      // await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: '24h', // Adjust as needed
    });

    // Set an auth_token cookie on the client side (httpOnly: false, secure: true, SameSite: Lax)
    res.cookie('auth_token', token, { httpOnly: false, secure: false, sameSite: 'Lax', maxAge: 86400000 }); // 24 hours

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
