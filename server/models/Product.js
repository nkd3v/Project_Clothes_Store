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
    OwnerId: {
        type: DataTypes.INTEGER,
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

Product.belongsToMany(Category, { through: 'Product_Category' });
Category.belongsToMany(Product, { through: 'Product_Category' });

module.exports = Product;