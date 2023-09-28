const Product = require('../models/Product');
const ProductTag = require('../models/ProductTag');
const ProductVariant = require('../models/ProductVariant');
const sequelize = require('../config/database'); // Import your database instance
const { Op } = require('sequelize');


// List products that match brand and categoryId criteria
exports.listProductsByCriteria = async (req, res) => {
  try {
    const { brand, categoryId, minPrice, maxPrice } = req.query;

    const whereClause = {};
    if (brand) {
      whereClause.brand = brand;
    }
    if (categoryId) {
      whereClause.CategoryId = categoryId;
    }

    // Include the ProductVariant association to calculate price range
    const products = await Product.findAll({
      where: whereClause,
      include: {
        model: ProductVariant,
        attributes: [],
        where: {
          price: {
            [Op.between]: [minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER],
          },
        },
      },
      attributes: [
        'id',
        'name',
        'description',
        'brand',
        'CategoryId',
        [sequelize.fn('min', sequelize.col('ProductVariants.price')), 'minPrice'],
        [sequelize.fn('max', sequelize.col('ProductVariants.price')), 'maxPrice'],
      ],
      group: ['Product.id'], // Group by Product to avoid duplicate rows
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// List all products with embedded product tags and variants
exports.listProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                ProductTag, // Include the ProductTag association
                ProductVariant, // Include the ProductVariant association
            ],
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single product by ID with embedded product tags and variants
exports.getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByPk(productId, {
            include: [
                ProductTag, // Include the ProductTag association
                ProductVariant, // Include the ProductVariant association
            ],
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.listVariantsByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        // Find the product by its ID
        const product = await Product.findByPk(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find all variants associated with the product
        const variants = await ProductVariant.findAll({
            where: { ProductId: productId },
        });

        // Return the variants
        res.json(variants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a new product
exports.createProduct = async (req, res) => {
    const { name, description, brand, category } = req.body;
    const tags = [...new Set(req.body['tags'].split(',').map(item => item.trim()))];
    const ownerId = req.user.id;

    if (!req.body['variants[][price]']) {
        return res.status(400).json({ error: 'Product require to have at least 1 variant' });
    }

    const variants = (() => {
        if (typeof (req.body['variants[][price]']) === 'string') {
            return [{
                price: req.body['variants[][price]'],
                size: req.body['variants[][size]'],
                color: req.body['variants[][color]'],
                quantity: req.body['variants[][quantity]']
            }];
        } else {
            return req.body['variants[][price]'].map((price, index) => ({
                price,
                size: req.body['variants[][size]'][index],
                color: req.body['variants[][color]'][index],
                quantity: req.body['variants[][quantity]'][index]
            }));
        }
    })();

    const files = req.files;

    if (!brand || !name || !description || !variants || !files) {
        return res.status(400).json({ error: 'Invalid product data' });
    }

    for (const variant of variants) {
        const { price, size, color, quantity } = variant;
        if (!price || !size || !color || !quantity) {
            return res.status(400).json({ error: 'Invalid variant data' });
        }
    }

    try {
        const existingProduct = await Product.findOne({ where: { name } });
        if (existingProduct) {
            return res.status(400).json({ error: 'A product with the same name already exists' });
        }

        // Create the Product instance
        const product = await Product.create({
            OwnerId: ownerId,
            name,
            description,
            brand,
            CategoryId: category,
        });

        // Create the ProductVariant instances
        const productVariants = await ProductVariant.bulkCreate(variants.map((variant, index) => ({
            ProductId: product.id,
            size: variant.size,
            color: variant.color,
            price: variant.price,
            quantity: variant.quantity,
            imageUrl: `${req.protocol}://${req.get('host')}/api/v1/uploads/` + (req.files ? req.files[index].filename : 'default.png'),
        })));

        // Find or Create ProductTag instances with unique names
        const productTags = [];
        for (const tag of tags) {
            const [productTag] = await ProductTag.findOrCreate({
                where: { name: tag },
            });
            productTags.push(productTag);
        }

        // Associate Product with ProductTag (many-to-many)
        await product.addProductTags(productTags);

        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, category, brand } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/api/v1/uploads/${req.file.filename}` : 'default.png';

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        product.imageUrl = imageUrl; // Update the image filename in the database
        product.category = category;
        product.brand = brand;
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
