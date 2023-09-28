const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductVariant = require('./ProductVariant'); // Import the ProductVariant model
const Cart = require('./Cart'); // Import the Cart model

const CartItem = sequelize.define('CartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Define associations
CartItem.belongsTo(ProductVariant);
ProductVariant.hasMany(CartItem);

CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);

module.exports = CartItem;
