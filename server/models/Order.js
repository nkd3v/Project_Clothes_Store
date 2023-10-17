const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const ProductVariant = require('./ProductVariant');
const User = require('./User');
const Coupon = require('./Coupon');

const Order = db.define('Orders', {
  status: {
    type: DataTypes.ENUM('Waiting for payment', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Waiting for payment',
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
    get() {
      if (this.OrderItems && this.OrderItems.length > 0) {
        return this.OrderItems.reduce((sum, orderItem) => sum + orderItem.totalPrice, 0);
      }
      return 0.0; // Return a default value if there are no associated OrderItems
    },
  },
  totalPriceBeforeDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
    get() {
      if (this.OrderItems && this.OrderItems.length > 0) {
        return this.OrderItems.reduce((sum, orderItem) => sum + orderItem.totalPriceBeforeDiscount, 0);
      }
      return 0.0; // Return a default value if there are no associated OrderItems
    },
  },
  couponDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
    get() {
      if (this.OrderItems && this.OrderItems.length > 0) {
        return this.OrderItems.reduce((sum, orderItem) => sum + orderItem.couponDiscount, 0);
      }
      return 0.0; // Return a default value if there are no associated OrderItems
    },
  },
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsTo(Coupon);
Coupon.hasMany(Order);

module.exports = Order;
