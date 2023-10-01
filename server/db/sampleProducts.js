const sequelize = require('../config/database');
const Product = require('../models/Product');
const ProductTag = require('../models/ProductTag');
const ProductVariant = require('../models/ProductVariant');
const Category = require('../models/Category');

// Function to create sample products with variants and tags
async function createSampleProducts() {
    try {
  
      // Create sample products with variants and tags
      const product1 = await Product.create({
        OwnerId: '1',
        name: 'Product 1',
        description: 'Description for Product 1',
        gender: 'UNISEX',
        className: 'เสื้อ',
        category: 'เสื้อกันหนาว',
        tags: 'abc, def',
      });
  
      const product2 = await Product.create({
        OwnerId: '2',
        name: 'Product 2',
        description: 'Description for Product 2',
        gender: 'WOMEN',
        className: 'เสื้อ',
        category: 'เสื้อฟลีซ (Fleece)',
      });

      const variant1 = await ProductVariant.create({
          size: 'S',
          // colorName: 'Red',
          color: '#FF0000', // Hex code for Red
          price: 19.99,
          quantity: 10,
          imageUrl: 'https://chiqko.pp.ua/api/v1/uploads/shirt.png',
          ProductId: product1.id, // Associate the variant with Product 1
      });
      
      const variant2 = await ProductVariant.create({
          size: 'M',
          // colorName: 'Blue',
          color: '#0000FF', // Hex code for Blue
          price: 24.99,
          quantity: 15,
          imageUrl: 'https://chiqko.pp.ua/api/v1/uploads/shirt.png',
          ProductId: product1.id, // Associate the variant with Product 1
      });
      
      // Create sample product variants for Product 2
      const variant3 = await ProductVariant.create({
          size: 'L',
          // colorName: 'Green',
          color: '#008000', // Hex code for Green
          price: 29.99,
          quantity: 8,
          imageUrl: 'https://chiqko.pp.ua/api/v1/uploads/shirt.png',
          ProductId: product2.id, // Associate the variant with Product 2
      });
  
      console.log('Sample products created successfully!');
    } catch (error) {
      console.error('Error creating sample products:', error);
    }
  }

module.exports = createSampleProducts;