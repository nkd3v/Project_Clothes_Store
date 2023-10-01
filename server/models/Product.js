const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const CategoryTag = require('./CategoryTag');
const categoryTags = require('./../data/categoryTags');
const { Op } = require('sequelize');

const GENDER_ENUM = ['UNISEX', 'MEN', 'WOMEN', 'BABY', 'KIDS'];

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
    gender: {
        type: DataTypes.ENUM(GENDER_ENUM),
        allowNull: false,
    },
    className: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tags: {
        type: DataTypes.TEXT,
    },
    categoryTags: {
        type: DataTypes.TEXT,
    },
});

Product.belongsTo(User, {
    foreignKey: 'OwnerId',
    allowNull: false,
});

User.hasMany(Product, {
    foreignKey: 'OwnerId',
});

Product.belongsTo(Category, {
    foreignKey: 'gender',
    targetKey: 'name',
    as: 'genderName',
});

Product.belongsTo(Category, {
    foreignKey: 'className',
    targetKey: 'name',
    as: 'classNameName',
});

Product.belongsTo(Category, {
    foreignKey: 'category',
    targetKey: 'name',
    as: 'categoryName',
});

Product.afterCreate(async (product) => {
    if (product.gender === 'UNISEX') {
        if (!product.gender?.trim()) {
            product.tags = "MEN, WOMEN";
        } else {
            product.tags += ", MEN, WOMEN";
        }
    }
    
    const category = categoryTags.find(category => category.name === product.category);

    if (category) {
        product.categoryTags = category.tags.join(', ');
    }

    await Product.update({
        tags: product.tags,
        categoryTags: product.categoryTags
    }, { where: { id: product.id } });

    if (product.tags) {
        const ProductTag = require('./ProductTag');
        // Split the tags string into an array using ', ' as the delimiter
        const tagArray = product.tags.split(', ');

        // Initialize an array to hold the productTags
        const productTags = [];

        // Sequentially find or create the tags and associate them with the product
        for (const tagName of tagArray) {
            const [productTag] = await ProductTag.findOrCreate({
                where: { name: tagName },
            });
            productTags.push(productTag);
        }

        // Associate the product with the tags
        await product.setProductTags(productTags);
    }
});

// Define an afterBulkCreate hook
Product.afterBulkCreate(async (products) => {
    for (const product of products) {
        // Call the afterCreate hook for each product in the bulk creation
        await product.afterCreate(product);
    }
});

module.exports = Product;