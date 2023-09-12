// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Example protected route
router.get('/profile', authenticateToken, (req, res) => {
  // This route is protected, and req.user contains the authenticated user's information
  res.json({ user: req.user });
});

module.exports = router;
