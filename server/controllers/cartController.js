const Cart = require('../models/Cart');
const ProductVariant = require('../models/ProductVariant');
const CartItem = require('../models/CartItem');

// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    // Extract productId and quantity from the request body
    const { productVariantId, quantity } = req.body;

    // Check if the product exists
    const productVariant = await ProductVariant.findByPk(productVariantId);
    if (!productVariant) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the user has a cart, or create one if not
    let cart = await Cart.findOne({
      where: { UserId: req.user.id }, // Assuming you have the user's ID in req.user.id
    });

    if (!cart) {
      cart = await Cart.create({ UserId: req.user.id });
    }

    // Check if the product is already in the cart
    const existingCartItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductVariantId: productVariantId },
    });

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // If the product is not in the cart, create a new cart item
      await CartItem.create({
        CartId: cart.id,
        ProductVariantId: productVariantId,
        quantity,
      });
    }

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// List products in the user's cart
exports.listCartProducts = async (req, res) => {
  try {
    const userCart = await Cart.findOne({
      where: { UserId: req.user.id },
      include: CartItem, // Include associated items
    });

    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(userCart.CartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
