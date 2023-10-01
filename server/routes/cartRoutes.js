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
 * /api/v1/carts/set:
 *   post:
 *     summary: Set a product to the user's cart
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
 *                 description: The ID of the product variant to set to the cart
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to set
 *             example:
 *               productVariantId: 1
 *               quantity: 3
 *     responses:
 *       201:
 *         description: Product set successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post('/set', authMiddleware, cartController.setProductQuantity);

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

/**
 * @swagger
 * /api/v1/carts/apply-coupon:
 *   post:
 *     summary: Apply a coupon to the user's cart
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
 *               couponCode:
 *                 type: string
 *                 description: The coupon code to apply
 *             example:
 *               couponCode: "SAVE20"
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *       400:
 *         description: Invalid request body or cart not found
 *       404:
 *         description: Invalid coupon code
 *       500:
 *         description: Internal server error
 */
router.post('/apply-coupon', authMiddleware, cartController.applyCoupon);

/**
 * @swagger
 * /api/v1/carts/remove-coupon:
 *   delete:
 *     summary: Remove the applied coupon from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupon removed successfully
 *       400:
 *         description: Cart not found or coupon removal failed
 *       500:
 *         description: Internal server error
 */
router.delete('/remove-coupon', authMiddleware, cartController.removeCoupon);

module.exports = router;
