const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const ProductVariant = require('./ProductVariant');
const User = require('./User');

const Order = db.define('Orders', {
  status: {
    type: DataTypes.ENUM('Waiting for payment', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Waiting for payment',
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2), // DECIMAL type for storing decimal values with two decimal places
    allowNull: false,
    defaultValue: 0.0, // Default value for totalPrice
  },
});

// Order.sync();

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;

