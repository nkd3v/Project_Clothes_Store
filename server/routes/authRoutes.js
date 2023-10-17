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
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               postalCode:
 *                 type: string
 *                 description: The postal code of the user's address.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the user (in ISO 8601 format).
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 description: The gender of the user.
 *               role:
 *                 type: string
 *                 enum: [Customer, Merchant, Admin, Moderator]
 *                 description: The role of the user.
 *             example:
 *               username: user1
 *               password: user1
 *               email: user1@example.com
 *               postalCode: 12345
 *               dateOfBirth: 1990-01-01
 *               gender: Male
 *               role: Customer
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
 *               email:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             example:
 *               email: user1@example.com
 *               password: user1
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

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout a user by clearing the auth_token cookie.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Logout successful
 *       500:
 *         description: Internal server error.
 */

router.post('/logout', authController.logout);

module.exports = router;
