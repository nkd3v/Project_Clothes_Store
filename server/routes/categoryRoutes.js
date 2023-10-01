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
 * /api/v1/categories/hierarchy-for-customer:
 *   get:
 *     summary: Get a list of all product categories for customer
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

router.get('/hierarchy-for-customer', categoryController.getAllCategoryHierarchyForCustomer);

/**
 * @swagger
 * /api/v1/categories/hierarchy-for-merchant:
 *   get:
 *     summary: Get a list of all product categories for merchant
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

router.get('/hierarchy-for-merchant', categoryController.getAllCategoryHierarchyForMerchant);

/**
 * @swagger
 * /api/v1/categories/id-name:
 *   get:
 *     summary: Get a list of all product categories id and name mapping
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

router.get('/id-name', categoryController.getAllCategoriesWithIdsAndNames);

module.exports = router;
