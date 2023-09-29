const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const { findClosestColor, fashionColors } = require('../utils/colorUtils');

const ProductVariant = sequelize.define('ProductVariant', {
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    colorName: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Define a hook to set the colorName before creating a new product variant
ProductVariant.beforeCreate(async (productVariant) => {
    // Verify that the color is a valid hex color code
    const isValidHexColor = /^#([0-9A-F]{3}){1,2}$/i.test(productVariant.color);

    if (isValidHexColor) {
        // Calculate the closest color name based on the color hex value
        const closestColor = findClosestColor(productVariant.color, fashionColors);
        console.log(closestColor.name);
        if (closestColor) {
            productVariant.colorName = closestColor.name;
        }
    } else {
        console.log(`Invalid color format: ${productVariant.color}`);
        // Handle the case where the color is not a valid hex color code
        // You can set a default colorName or handle it as needed.
    }
});


Product.hasMany(ProductVariant);
ProductVariant.belongsTo(Product);

module.exports = ProductVariant;
