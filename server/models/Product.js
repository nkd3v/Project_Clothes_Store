const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');

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
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    OwnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CategoryId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Product.belongsTo(User, {
    foreignKey: 'OwnerId',
    allowNull: false,
});

User.hasMany(Product, {
    foreignKey: 'OwnerId',
});

Product.belongsTo(Category);
Category.hasMany(Product);

module.exports = Product;
