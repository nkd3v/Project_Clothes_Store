const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const { userId } = req.user; // Assuming you have user information in req.user

  try {
    // Check if the product and user exist
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const userCart = await Cart.findOne({
      where: { userId },
    });

    if (!userCart) {
      // Create a new cart for the user if it doesn't exist
      const newCart = await Cart.create({ userId });
      await newCart.addProduct(product, { through: { quantity } });
    } else {
      // Add the product to the existing cart
      await userCart.addProduct(product, { through: { quantity } });
    }

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// List products in the user's cart
exports.listCartProducts = async (req, res) => {
  const { userId } = req.user; // Assuming you have user information in req.user

  try {
    const userCart = await Cart.findOne({
      where: { userId },
      include: 'items', // Include associated items
    });

    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(userCart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
