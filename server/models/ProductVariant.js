const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Import the Product model

const ProductVariant = sequelize.define('ProductVariant', {
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Define the price attribute
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER, // Define the quantity attribute
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Define the one-to-many association
Product.hasMany(ProductVariant);
ProductVariant.belongsTo(Product);

module.exports = ProductVariant;
