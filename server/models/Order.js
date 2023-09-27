// const { Sequelize, DataTypes } = require('sequelize');
// const db = require('../config/database');
// const Product = require('./Product');
// const User = require('./User');

// const Order = db.define('Orders', {
//   totalAmount: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
//     allowNull: false,
//     defaultValue: 'Pending',
//   },
// });

// Order.belongsTo(User, { foreignKey: 'userId' });
// Order.belongsToMany(Product, {
//   through: 'OrderItems',
//   foreignKey: 'orderId',
//   otherKey: 'productId',
//   as: 'items',
// });

// module.exports = Order;

