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
});

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;

