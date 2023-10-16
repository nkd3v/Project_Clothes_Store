const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid'); // Import UUIDv4 generator
const Order = require('./Order');

// Define the Payment model
const Payment = db.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  payer: {
    type: DataTypes.STRING, // Assuming payer's name is a string
    allowNull: true,
  },
  payTime: {
    type: DataTypes.TIME, // Assuming paytime is a time field
    allowNull: true,
  },
  payDate: {
    type: DataTypes.DATE, // Assuming paydate is a date field
    allowNull: true,
  },
  slipUrl: {
    type: DataTypes.STRING, // Assuming slipUrl is a string (URL)
    allowNull: true,
  },
});

// Define the association between Payment and Order
Payment.hasMany(Order); // Each payment can have multiple associated orders
Order.belongsTo(Payment); // Each order belongs to one payment

module.exports = Payment;
