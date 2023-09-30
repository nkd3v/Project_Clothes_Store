const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const { findClosestColor, fashionColors } = require('../utils/colorUtils');

// Define a function to set the colorName before creating a new product variant
const setColorNameBeforeCreate = async (productVariant) => {
    const isValidHexColor = /^#([0-9A-F]{3}){1,2}$/i.test(productVariant.color);

    if (isValidHexColor) {
        const closestColor = findClosestColor(productVariant.color, fashionColors);
        console.log(closestColor.name);
        if (closestColor) {
            productVariant.colorName = closestColor.name;
        }
    } else {
        console.log(`Invalid color format: ${productVariant.color}`);
    }
};

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

// Define a beforeCreate hook to set the colorName before creating a new product variant
ProductVariant.beforeCreate(async (productVariant, options) => {
    await setColorNameBeforeCreate(productVariant);
});

// Define a beforeBulkCreate hook to apply the logic for each instance
ProductVariant.beforeBulkCreate(async (instances, options) => {
    for (const instance of instances) {
        await setColorNameBeforeCreate(instance);
    }
});

Product.hasMany(ProductVariant);
ProductVariant.belongsTo(Product);

module.exports = ProductVariant;