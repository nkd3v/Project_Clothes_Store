const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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
router.post('/', authMiddleware, orderController.createOrder);

/**
 * @swagger
 * /api/v1/orders:
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
router.get('/', authMiddleware, orderController.listOrders);

/**
 * @swagger
 * /api/v1/orders/qr-code:
 *   post:
 *     summary: Generate a QR code for an order
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
 *               id:
 *                 type: string
 *                 description: The ID of the order to generate the QR code for.
 *             example:
 *               id: 1
 *     responses:
 *       200:
 *         description: QR code generated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

router.post('/qr-code', authMiddleware, orderController.generateQRCode);

/**
 * @swagger
 * /api/v1/orders/pay:
 *   get:
 *     summary: Set order status to "Processing" for a specific order.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to set the status for.
 *     responses:
 *       200:
 *         description: Order status updated to Processing.
 *       400:
 *         description: Invalid request or order status cannot be updated.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */

router.get('/pay', orderController.payOrder);

module.exports = router;
