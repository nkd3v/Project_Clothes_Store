// app/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/v1/user/set-address-info:
 *   post:
 *     summary: Set user address information
 *     tags: [User]
 *     description: Set the address information for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               postalCode:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Address information updated successfully
 *       '500':
 *         description: Failed to update address information
 */

router.post('/set-address-info', authMiddleware, userController.setUserAddressInfo);

/**
 * @swagger
 * /api/v1/user/get-user-info:
 *   get:
 *     summary: Get user information
 *     tags: [User]
 *     description: Get the information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Failed to fetch user information
 */

router.get('/get-user-info', authMiddleware, userController.getUserInfo);

router.get('/users', authMiddleware, userController.getAllUsers);

module.exports = router;
