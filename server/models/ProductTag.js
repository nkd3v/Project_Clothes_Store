const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Import the Product model

const ProductTag = sequelize.define('ProductTag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

// Define the many-to-many association
Product.belongsToMany(ProductTag, { through: 'Product_ProductTag' });
ProductTag.belongsToMany(Product, { through: 'Product_ProductTag' });

module.exports = ProductTag;
