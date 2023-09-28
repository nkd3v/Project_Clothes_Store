const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create an order from the user's cart
exports.createOrder = async (req, res) => {
  res.status(201).json({});
  // const { userId } = req.user; // Assuming you have user information in req.user

  // try {
  //   const userCart = await Cart.findOne({
  //     where: { userId },
  //     include: 'items', // Include associated items
  //   });

  //   if (!userCart || userCart.items.length === 0) {
  //     return res.status(400).json({ error: 'Cart is empty' });
  //   }

  //   const totalAmount = userCart.items.reduce(
  //     (total, item) => total + item.price * item.cart_items.quantity,
  //     0
  //   );

  //   const order = await Order.create({ userId, totalAmount });

  //   // Associate the items from the cart with the order
  //   await order.addItems(userCart.items, { through: { quantity: Sequelize.col('items.cart_items.quantity') } });

  //   // Clear the user's cart after creating the order
  //   await userCart.setItems([]);

  //   res.status(201).json(order);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
};

// List orders for a user
exports.listOrders = async (req, res) => {
  const { userId } = req.user; // Assuming you have user information in req.user

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: 'items', // Include associated items
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
