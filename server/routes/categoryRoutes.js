// categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/v1/categories/name:
 *   get:
 *     summary: Get all categories with subcategories.
 *     tags: [Categories]
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

router.get('/name', categoryController.getAllCategoryName);


/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all category attributes
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved category attributes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   level:
 *                     type: integer
 */

router.get('/', categoryController.getAllCategoryAttributes);

module.exports = router;
