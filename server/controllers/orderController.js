const Order = require('../models/Order');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const OrderItem = require('../models/OrderItem');
const ProductVariant = require('../models/ProductVariant');
const Coupon = require('../models/Coupon');
const User = require('../models/User');
const QRCode = require('qrcode');
const { Readable } = require('stream'); // To create a readable stream
const { Sequelize, DataTypes } = require('sequelize');

// Create an order from the user's cart
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
      include: [
        {
          model: Coupon,
        },
        {
          model: CartItem,
          include: ProductVariant,
        },
      ],
    });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const coupon = cart.Coupon;

    // Calculate the total price with the applied coupon discount
    let totalPrice = cart.CartItems.reduce(
      (total, cartItem) =>
        total + cartItem.ProductVariant.price * cartItem.quantity,
      0
    );

    if (coupon) {
      const couponDiscount = (coupon.discountPercentage / 100) * totalPrice;
      totalPrice -= couponDiscount;
    }

    const order = await Order.create({ UserId: req.user.id, totalPrice });

    // Check if the user hasn't used this coupon before
    const user = await User.findByPk(req.user.id);

    const hasUsedCoupon = await user.hasCoupon(coupon);

    if (!hasUsedCoupon) {
      // Associate the coupon with the user
      await user.addCoupon(coupon);
    }

    // Move cart items to order items
    const orderItemsPromises = cart.CartItems.map(async (cartItem) => {
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
    await CartItem.destroy({ where: { CartId: cart.id } });

    return res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.generateQRCode = async (req, res) => {
  try {
    const url = `${req.protocol}://${req.get('host')}/api/v1/orders/pay?id=${req.body.id}`;

    // Generate the QR code as a PNG image
    const qrCodeBuffer = await QRCode.toBuffer(url);

    // Create a readable stream from the buffer
    const qrCodeStream = new Readable();
    qrCodeStream.push(qrCodeBuffer);
    qrCodeStream.push(null); // End of the stream

    // Set the response headers for the image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename=qr-code.png');

    // Pipe the stream to the response
    qrCodeStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Set order status to "Processing" if it's "Waiting for payment"
exports.payOrder = async (req, res) => {
  try {
    // Get the order ID from the request body
    const { id } = req.query;

    // Find the order by ID
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status === 'Waiting for payment') {
      // Update the order status to "Processing"
      order.status = 'Processing';
      await order.save();

      return res.json({ message: 'Order status updated to Processing' });
    } else {
      return res.status(400).json({ error: 'Order status cannot be updated' });
    }
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
      attributes: [
        'id',
        'status',
        'totalPrice',
        'createdAt',
        'updatedAt',
        'UserId',
        // Add an attribute for orderItemCount using Sequelize.literal
      ],
      include: {
        model: OrderItem,
        attributes: ['id', 'quantity', 'ProductVariantId', 'OrderId'],
        include: {
          model: ProductVariant,
          attributes: ['id', 'size', 'color', 'price', 'colorName', 'imageUrl'],
          include: {
            model: Product,
            attributes: ['name', 'description', 'gender', 'className', 'category'],
            include: {
              model: User,
              attributes: [['username', 'brand']],
            },
          },
        },
      },
    });

    function addTotalOrderCount(orders) {
      for (const order of orders) {
        const orderItems = order.OrderItems || [];
        const totalOrderCount = orderItems.length;
    
        // Add the totalOrderCount to the current order object
        order.dataValues.totalOrderCount = totalOrderCount;
      }
    }

    addTotalOrderCount(orders);

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

