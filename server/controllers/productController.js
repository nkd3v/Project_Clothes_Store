const Product = require('../models/Product');

// List all products
exports.listProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, category, brand } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/api/v1/uploads/${req.file.filename}` : 'default.png';

    try {
        const product = await Product.create({
            name,
            description,
            price,
            imageUrl, // Save the image filename to the database
            category,
            brand,
        });
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
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
