// app/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             example:
 *               username: user123
 *               password: mypassword
 *     responses:
 *       200:
 *         description: Successfully registered a new user and received a token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: An authentication token for the registered user.
 *       400:
 *         description: Bad request. Invalid input data.
 *       409:
 *         description: Conflict. The username already exists.
 *       500:
 *         description: Internal server error. Registration failed.
 */

router.post('/register', authController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in with username and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             example:
 *               username: user123
 *               password: mypassword
 *     responses:
 *       200:
 *         description: Successfully logged in and received an authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: An authentication token for the logged-in user.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *       500:
 *         description: Internal server error. Login failed.
 */

router.post('/login', authController.login);

module.exports = router;
