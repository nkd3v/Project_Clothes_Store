const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user placing the order
 *               cartId:
 *                 type: integer
 *                 description: The ID of the user's cart
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Cart not found or cart is empty
 *       500:
 *         description: Internal server error
 */
router.post('/orders', orderController.createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: List orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Internal server error
 */
router.get('/orders', orderController.listOrders);

module.exports = router;
