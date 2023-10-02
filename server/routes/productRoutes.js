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
 *         name: keywords
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: A search query.
 *       - in: query
 *         name: brands
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: An array of brands of the products to filter.
 *       - in: query
 *         name: sizes
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: An array of sizes of the products to filter.
 *       - in: query
 *         name: colors
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: An array of colors of the products to filter.
 *       - in: query
 *         name: tags
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: An array of tags of the products to filter.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category of the products to filter.
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
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal server error
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
 *     tags: [Products]
 *     security:
 *       - auth_token: []
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
 *                 required: true
 *               description:
 *                 type: string
 *                 description: A brief description of the product.
 *                 required: true
 *               brand:
 *                 type: string
 *                 description: The branch where the product is available.
 *                 required: true
 *               gender:
 *                 type: string
 *                 enum: [MEN, WOMEN, BABY, KIDS, UNISEX]
 *                 description: The gender category for the product (e.g., MEN, WOMEN, UNISEX).
 *                 required: true
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *                 required: true
 *               variants:
 *                 type: array
 *                 description: An array of product variants.
 *                 required: true
 *                 items:
 *                   type: object
 *                   required: true
 *                   properties:
 *                     images:
 *                       type: file
 *                       description: An array of base64-encoded image strings for the variant.
 *                       required: true
 *                     size:
 *                       type: string
 *                       description: The size of the variant (e.g., Small, Medium, Large).
 *                       required: true
 *                     color:
 *                       type: string
 *                       description: The color of the variant.
 *                       required: true
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: The price of the variant.
 *                       required: true
 *                     quantity:
 *                       type: number
 *                       format: float
 *                       description: The quantity available for this variant.
 *                       required: true
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.post('/', authMiddleware, upload.any('variants[][image]'), productController.createProduct);

/**
 * @swagger
 * /api/v1/products/{productId}:
 *   put:
 *     summary: Update a product by ID with an image upload
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the product.
 *                 example: "Updated Dress"
 *               description:
 *                 type: string
 *                 description: The updated description of the product.
 *                 example: "An updated dress for special occasions."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The updated price of the product.
 *                 example: 59.99
 *               image:
 *                 type: file
 *                 description: The updated image of the product.
 *               category:
 *                 type: string
 *                 description: The updated category of the product.
 *                 example: "Apparel"
 *               brand:
 *                 type: string
 *                 description: The updated brand of the product.
 *                 example: "Fashion Co."
 *     responses:
 *       200:
 *         description: The updated product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put('/:productId', upload.single('image'), productController.updateProduct);

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
