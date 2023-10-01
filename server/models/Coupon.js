const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./User');
const Cart = require('./Cart');

const Coupon = db.define('Coupon', {
  code: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // Ensure that coupon codes are unique
  },
  discountPercentage: {
    type: DataTypes.INTEGER, // You can change this to DECIMAL if needed
    allowNull: false,
    validate: {
      min: 0, // Minimum discount percentage
      max: 100, // Maximum discount percentage
    },
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.belongsToMany(Coupon, { through: 'User_Coupon', as: 'coupons' });
Coupon.belongsToMany(User, { through: 'User_Coupon', as: 'users' });


module.exports = Coupon;
