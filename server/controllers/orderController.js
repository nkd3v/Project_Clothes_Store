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
const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/Payment');

exports.getAllOrderStatuses = async (req, res) => {
  try {
    const orderStatuses = await Order.rawAttributes.status.values; // Get the possible order statuses
    res.status(200).json(orderStatuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.uploadSlip = async (req, res) => {
  try {
    const { name, date, time, paymentId } = req.body;
    const slipImage = req.file;

    if (!name || !date || !time || !paymentId || !slipImage) {
      return res.status(400).json({ error: 'Missing values' });
    }

    res.status(201).json({ message: 'Slip uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.setOrderStatusById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderStatusId } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the provided orderStatusId is valid
    const validOrderStatuses = await Order.rawAttributes.status.values;
    if (!validOrderStatuses.includes(orderStatusId)) {
      return res.status(400).json({ error: 'Invalid orderStatusId' });
    }

    order.status = orderStatusId;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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
    let totalPriceBeforeDiscount = totalPrice;
    let couponDiscount = 0;

    if (coupon) {
      couponDiscount = (coupon.discountPercentage / 100) * totalPrice;
      totalPrice -= couponDiscount;
    }

    // Check if the user hasn't used this coupon before
    const user = await User.findByPk(req.user.id);

    const hasUsedCoupon = await user.hasCoupon(coupon);

    if (!hasUsedCoupon) {
      // Associate the coupon with the user
      await user.addCoupon(coupon);
    } else {
      return res.json({ message: 'You have already used this coupon.' });
    }

    const payment = await Payment.create({ totalPrice, totalPriceBeforeDiscount, couponDiscount });

    // Move cart items to order items
    const orderItemsPromises = cart.CartItems.map(async (cartItem) => {
      const order = await Order.create({ UserId: req.user.id, CouponId: coupon?.id, PaymentId: payment.id });
      // Create an order item for each cart item
      await OrderItem.create({
        OrderId: order.id,
        ProductVariantId: cartItem.ProductVariantId,
        quantity: cartItem.quantity,
      });

      // Reduce the quantity of the corresponding product variant
      const productVariant = await ProductVariant.findByPk(cartItem.ProductVariantId);
      if (productVariant) {
        productVariant.quantity -= cartItem.quantity;
        await productVariant.save();
      }

      return order.toJSON();
    });
    

    // Wait for all order items to be created
    const orders = await Promise.all(orderItemsPromises);
    console.log(orders);

    // Clear the user's cart
    await CartItem.destroy({ where: { CartId: cart.id } });
    await Cart.destroy({ where: { id: cart.id } });

    return res.status(201).json({ message: 'Order created successfully', paymentId: orders[0].PaymentId });
  } catch (error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.generateQRCode = async (req, res) => {
  try {
    const url = `${req.protocol}://${req.get('host')}/api/v1/orders/pay?paymentId=${req.body.id}`;

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
    const { paymentId } = req.query;

    // Find and update other orders with the same PaymentId
    await Order.update(
      { status: 'Processing' },
      {
        where: { PaymentId: paymentId, status: 'Waiting for payment' },
      }
    );

    // Update the soldCount for product variants associated with the paid orders
    const paidOrders = await Order.findAll({
      where: { PaymentId: paymentId, status: 'Processing' },
      include: {
        model: OrderItem,
        include: ProductVariant,
      },
    });

    for (const order of paidOrders) {
      for (const orderItem of order.OrderItems) {
        const productVariant = orderItem.ProductVariant;
        productVariant.soldCount += orderItem.quantity;
        await productVariant.save();
      }
    }

    return res.json({ message: 'Order status updated to Processing' });
  } catch (error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listOrdersByMerchant = async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: [
        'id',
        'status',
        'totalPrice',
        'totalPriceBeforeDiscount',
        'couponDiscount',
        'createdAt',
        'updatedAt',
        'UserId',
        'paymentId',
        // Add an attribute for orderItemCount using Sequelize.literal
      ],
      include: [{
        model: OrderItem,
        attributes: ['id', 'quantity', 'ProductVariantId', 'OrderId', 'totalPrice', 'totalPriceBeforeDiscount', 'couponDiscount'],
        required: true,
        include: {
          model: ProductVariant,
          attributes: ['id', 'size', 'color', 'price', 'colorName', 'imageUrl'],
          required: true,
          include: {
            model: Product,
            attributes: ['name', 'description', 'gender', 'className', 'category'],
            required: true,
            include: {
              model: User,
              where: { id: req.user.id },
              attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'address1', 'address2', 'country', 'state', 'city', 'postalCode', 'phoneNumber', 'role']
            },
          },
        },
      },],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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
        'totalPriceBeforeDiscount',
        'couponDiscount',
        'createdAt',
        'updatedAt',
        'UserId',
        'paymentId',
        // Add an attribute for orderItemCount using Sequelize.literal
      ],
      include: [{
        model: OrderItem,
        attributes: ['id', 'quantity', 'ProductVariantId', 'OrderId', 'totalPrice', 'totalPriceBeforeDiscount', 'couponDiscount'],
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
      {
        model: Payment,
      }],
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

