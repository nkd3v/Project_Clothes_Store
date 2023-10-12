const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid'); // Import UUIDv4 generator
const Order = require('./Order');

// Define the Payment model
const Payment = db.define('Payment', {
  id: {
    type: DataTypes.UUID,         // Use UUID data type
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,             // Set it as the primary key
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  totalPriceBeforeDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  couponDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define the association between Payment and Order
Payment.hasMany(Order); // Each payment can have multiple associated orders
Order.belongsTo(Payment); // Each order belongs to one payment

module.exports = Payment;
