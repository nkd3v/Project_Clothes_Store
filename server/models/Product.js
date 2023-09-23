const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {}

Product.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.TEXT,
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        imageUrl: DataTypes.STRING, // Use camel case for column name
        category: DataTypes.STRING,
        brand: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true, // Enable timestamps
    }
);

module.exports = Product;
