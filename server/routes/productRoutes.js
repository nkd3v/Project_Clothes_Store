const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product operations
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: List products by criteria
 *     description: Retrieve a list of products that match the specified criteria.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: The brand of the products to filter.
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: The category ID of the products to filter.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: The minimum price of products to filter.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: The maximum price of products to filter.
 *     responses:
 *       '200':
 *         description: A list of products matching the criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product's unique identifier.
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   description:
 *                     type: string
 *                     description: The description of the product.
 *                   brand:
 *                     type: string
 *                     description: The brand of the product.
 *                   CategoryId:
 *                     type: integer
 *                     description: The category ID of the product.
 *                   minPrice:
 *                     type: number
 *                     description: The minimum price among the product variants.
 *                   maxPrice:
 *                     type: number
 *                     description: The maximum price among the product variants.
 *               example:
 *                 - id: 1
 *                   name: Product 1
 *                   description: Description for Product 1
 *                   brand: Brand 1
 *                   CategoryId: 1
 *                   minPrice: 10
 *                   maxPrice: 50
 *                 - id: 2
 *                   name: Product 2
 *                   description: Description for Product 2
 *                   brand: Brand 2
 *                   CategoryId: 2
 *                   minPrice: 20
 *                   maxPrice: 60
 *       '500':
 *         description: Internal server error.
 */
router.get('/', productController.listProductsByCriteria);

/**
 * @swagger
 * /api/v1/products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The product with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/:productId', productController.getProductById);

/**
 * @swagger
 * /api/v1/products/{productId}/variants:
 *   get:
 *     summary: Get variants for a product by product ID.
 *     description: Retrieve all variants associated with a specific product by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve variants for.
 *     responses:
 *       '200':
 *         description: Successful response with an array of variants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductVariant'
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:productId/variants', productController.listVariantsByProductId);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product in the clothing shop's inventory.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               description:
 *                 type: string
 *                 description: A brief description of the product.
 *               brand:
 *                 type: string
 *                 description: The branch where the product is available.
 *               tags:
 *                 type: array
 *                 description: An array of tags associated with the product.
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *               variants:
 *                 type: array
 *                 description: An array of product variants.
 *                 items:
 *                   type: object
 *                   properties:
 *                     images:
 *                       type: file
 *                       description: An array of image files for the variant.
 *                     size:
 *                       type: string
 *                       description: The size of the variant (e.g., Small, Medium, Large).
 *                     color:
 *                       type: string
 *                       description: The color of the variant.
 *                     price:
 *                       type: number
 *                       description: The price of the variant.
 *                     quantity:
 *                       type: number
 *                       format: float
 *                       description: The quantity available for this variant.
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', authMiddleware, upload.any('variants[][image]'), productController.createProduct);

/**
 * @swagger
 * /api/v1/products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
