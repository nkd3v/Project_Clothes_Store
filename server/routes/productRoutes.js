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
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the product.
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product.
 *           example: "Cotton T-shirt"
 *         description:
 *           type: string
 *           description: A description of the product.
 *           example: "A comfortable cotton T-shirt in various colors."
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product.
 *           example: 19.99
 *         imageUrl:
 *           type: string
 *           description: The URL of the product's image.
 *           example: "https://example.com/images/tshirt.jpg"
 *         category:
 *           type: string
 *           description: The category of the product.
 *           example: "Apparel"
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *           example: "Fashion Co."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the product was created.
 *           example: "2023-09-23T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the product was last updated.
 *           example: "2023-09-23T12:34:56Z"
 *       required:
 *         - name
 *         - price
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the new product.
 *           example: "New Trousers"
 *         description:
 *           type: string
 *           description: A description of the new product.
 *           example: "A new pair of trousers for casual wear."
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the new product.
 *           example: 39.99
 *         imageUrl:
 *           type: string
 *           description: The URL of the new product's image.
 *           example: "https://example.com/images/trousers.jpg"
 *         category:
 *           type: string
 *           description: The category of the new product.
 *           example: "Apparel"
 *         brand:
 *           type: string
 *           description: The brand of the new product.
 *           example: "Fashion Co."
 *       required:
 *         - name
 *         - price
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The updated name of the product.
 *           example: "Updated Dress"
 *         description:
 *           type: string
 *           description: The updated description of the product.
 *           example: "An updated dress for special occasions."
 *         price:
 *           type: number
 *           format: float
 *           description: The updated price of the product.
 *           example: 59.99
 *         imageUrl:
 *           type: string
 *           description: The updated URL of the product's image.
 *           example: "https://example.com/images/dress.jpg"
 *         category:
 *           type: string
 *           description: The updated category of the product.
 *           example: "Apparel"
 *         brand:
 *           type: string
 *           description: The updated brand of the product.
 *           example: "Fashion Co."
 *       required:
 *         - name
 *         - price
 */



/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/', productController.listProducts);

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
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
