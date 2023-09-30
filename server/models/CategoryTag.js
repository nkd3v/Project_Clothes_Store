const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category'); // Import the Category model

const CategoryTag = sequelize.define('CategoryTag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

// Define the many-to-many association
Category.belongsToMany(CategoryTag, { through: 'Category_CategoryTag' });
CategoryTag.belongsToMany(Category, { through: 'Category_CategoryTag' });

module.exports = CategoryTag;
