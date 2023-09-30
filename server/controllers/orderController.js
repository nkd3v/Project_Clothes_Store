const Order = require('../models/Order');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const OrderItem = require('../models/OrderItem');
const ProductVariant = require('../models/ProductVariant');

// Create an order from the user's cart
exports.createOrder = async (req, res) => {
  try {
    const userCart = await Cart.findOne({
      where: { UserId: req.user.id },
      include: {
        model: CartItem,
        include: ProductVariant,
      },
    });

    if (!userCart || userCart.CartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const totalPrice = userCart.CartItems.reduce(
      (total, cartItem) => total + cartItem.ProductVariant.price * cartItem.quantity,
      0
    );

    const order = await Order.create({ UserId: req.user.id, totalPrice });

    // Move cart items to order items
    const orderItemsPromises = userCart.CartItems.map(async (cartItem) => {
      // Create an order item for each cart item
      await OrderItem.create({
        OrderId: order.id,
        ProductVariantId: cartItem.ProductVariantId,
        quantity: cartItem.quantity,
      });
    });

    // Wait for all order items to be created
    await Promise.all(orderItemsPromises);

    // Clear the user's cart
    await CartItem.destroy({ where: { CartId: userCart.id } });

    return res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// List orders for a user
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: {
        model: CartItem,
        include: ProductVariant,
      },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
