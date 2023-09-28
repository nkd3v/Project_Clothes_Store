const sequelize = require('../config/database');
const Product = require('../models/Product');
const ProductTag = require('../models/ProductTag');
const ProductVariant = require('../models/ProductVariant');


// Function to create sample products with variants and tags
async function createSampleProducts() {
    try {
      // Create sample product tags
      const tag1 = await ProductTag.create({ name: 'Tag 1' });
      const tag2 = await ProductTag.create({ name: 'Tag 2' });
  
      // Create sample products with variants and tags
      const product1 = await Product.create({
        OwnerId: '1',
        name: 'Product 1',
        description: 'Description for Product 1',
        CategoryId: '1',
        brand: 'Brand 1',
      });
  
      const product2 = await Product.create({
        OwnerId: '2',
        name: 'Product 2',
        description: 'Description for Product 2',
        CategoryId: '1',
        brand: 'Brand 2',
      });
  
      // Create sample product variants for Product 1
      const variant1 = await ProductVariant.create({
        size: 'S',
        color: 'Red',
        price: 19.99,
        quantity: 10,
        imageUrl: 'https://chiqko.pp.ua/api/v1/uploads/shirt.png',
        ProductId: product1.id, // Associate the variant with Product 1
      });
  
      const variant2 = await ProductVariant.create({
        size: 'M',
        color: 'Blue',
        price: 24.99,
        quantity: 15,
        imageUrl: 'https://chiqko.pp.ua/api/v1/uploads/shirt.png',
        ProductId: product1.id, // Associate the variant with Product 1
      });
  
      // Add tags to Product 1
      await product1.addProductTag(tag1);
      await product1.addProductTag(tag2);
  
      // Create sample product variants for Product 2
      const variant3 = await ProductVariant.create({
        size: 'L',
        color: 'Green',
        price: 29.99,
        quantity: 8,
        imageUrl: 'https://chiqko.pp.ua/api/v1/uploads/shirt.png',
        ProductId: product2.id, // Associate the variant with Product 2
      });
  
      // Add tags to Product 2
      await product2.addProductTag(tag2);
  
      console.log('Sample products created successfully!');
    } catch (error) {
      console.error('Error creating sample products:', error);
    }
  }

module.exports = createSampleProducts;