// categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API operations related to product categories
 */

/**
 * @swagger
 * /api/v1/categories/hierarchy:
 *   get:
 *     summary: Get a list of all product categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */

router.get('/hierarchy', categoryController.getAllCategoryHierarchy);

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get a list of all product categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */

router.get('/', categoryController.getAllCategoriesWithIdsAndNames);

module.exports = router;
