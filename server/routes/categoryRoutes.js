// categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories with subcategories.
 *     description: Retrieve all categories along with their subcategories.
 *     responses:
 *       '200':
 *         description: A JSON object containing categories and subcategories.
 *         content:
 *           application/json:
 *             example:
 *               Men:
 *                 Clothing: null
 *                 Footwear: null
 *                 T-Shirts: null
 *               Women:
 *                 Dresses: null
 *                 Skirts: null
 */

router.get('/', categoryController.getAllCategories);

module.exports = router;
