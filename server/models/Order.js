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
      if (this.OrderItems) {
        return this.OrderItems[0].totalPrice;
      }
      return 0.0; // Return a default value if there is no associated OrderItems
    },
  },
  totalPriceBeforeDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
    get() {
      if (this.OrderItems) {
        return this.OrderItems[0].totalPriceBeforeDiscount;
      }
      return 0.0; // Return a default value if there is no associated OrderItems
    },
  },
  couponDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
    get() {
      if (this.OrderItems) {
        return this.OrderItems[0].couponDiscount;
      }
      return 0.0; // Return a default value if there is no associated OrderItems
    },
  },
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsTo(Coupon);
Coupon.hasMany(Order);

module.exports = Order;
