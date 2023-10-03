const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductVariant = require('./ProductVariant'); // Import the ProductVariant model
const Order = require('./Order');

const OrderItem = sequelize.define('OrderItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

OrderItem.belongsTo(ProductVariant);
ProductVariant.hasMany(OrderItem);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

module.exports = OrderItem;