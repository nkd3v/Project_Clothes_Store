const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const User = require('./User');

const Cart = db.define('Carts', {});

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsToMany(Product, {
  through: 'CartItems',
  foreignKey: 'cartId',
  otherKey: 'productId',
  as: 'items',
});

module.exports = Cart;
