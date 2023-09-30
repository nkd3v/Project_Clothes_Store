const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const CategoryTag = require('./CategoryTag');
const { Op } = require('sequelize');

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

Product.prototype.getCategoryTagsForProducts = async function () {
    try {
        const productIds = [this.id]; // Get the product's ID
        const products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: productIds,
                },
            },
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                    include: [
                        {
                            model: CategoryTag,
                            attributes: ['name'],
                            through: {
                                attributes: [],
                            },
                        },
                    ],
                },
            ],
        });

        // Extract and deduplicate category tags from the products
        const categoryTags = [];
        products.forEach((product) => {
            product.Categories.forEach((category) => {
                category.CategoryTags.forEach((tag) => {
                    if (!categoryTags.includes(tag.name)) {
                        categoryTags.push(tag.name);
                    }
                });
            });
        });

        return categoryTags;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

module.exports = Product;