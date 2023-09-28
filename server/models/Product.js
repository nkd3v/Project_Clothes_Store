const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Product.belongsTo(User, {
    foreignKey: 'OwnerId',
    allowNull: false,
});

User.hasMany(Product, {
    foreignKey: 'OwnerId',
});

module.exports = Product;
