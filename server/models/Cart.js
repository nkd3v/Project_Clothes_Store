const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Cart = sequelize.define('Cart');

// Define the one-to-one association with the User model
Cart.belongsTo(User);
User.hasOne(Cart);

module.exports = Cart;