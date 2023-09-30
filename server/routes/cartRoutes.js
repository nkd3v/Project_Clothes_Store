const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /api/v1/carts/add:
 *   post:
 *     summary: Add a product to the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productVariantId:
 *                 type: integer
 *                 description: The ID of the product variant to add to the cart
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add
 *             example:
 *               productVariantId: 1
 *               quantity: 3
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post('/add', authMiddleware, cartController.addToCart);

/**
 * @swagger
 * /api/v1/carts/products:
 *   get:
 *     summary: List products in the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products in the cart
 *       404:
 *         description: Cart not found or cart is empty
 *       500:
 *         description: Internal server error
 */
router.get('/products', authMiddleware, cartController.listCartProducts);

module.exports = router;
