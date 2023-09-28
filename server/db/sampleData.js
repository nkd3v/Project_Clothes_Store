const sequelize = require('../config/database');
const axios = require('axios');
const Product = require('../models/Product');
const ProductTag = require('../models/ProductTag');
const ProductVariant = require('../models/ProductVariant');
const User = require('../models/User');


async function createSampleData() {
  try {

    // Create sample users
    const user1 = await User.create({
      username: 'user1',
      password: '$2a$10$Q8D.avI8SzfhOBcPTAAY9.l6HRYEm0Vo9lJ4gK.sJDlxb/vwwps/6',
      email: 'user1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-15'),
      gender: 'Male',
      address1: '123 Main St',
      city: 'City 1',
      state: 'State 1',
      country: 'Country 1',
      postalCode: '12345',
      phoneNumber: '123-456-7890',
      role: 'Customer',
    });

    const user2 = await User.create({
      username: 'user2',
      password: '$2a$10$UAJ7A4lgOdI4cvFyXTNV0evhpUHHZtnT4s2MrYL6JJp0aKaDbipMa',
      email: 'user2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: new Date('1985-03-20'),
      gender: 'Female',
      address1: '456 Elm St',
      city: 'City 2',
      state: 'State 2',
      country: 'Country 2',
      postalCode: '67890',
      phoneNumber: '987-654-3210',
      role: 'Merchant',
    });

    // Create sample product tags
    const tag1 = await ProductTag.create({ name: 'Tag 1' });
    const tag2 = await ProductTag.create({ name: 'Tag 2' });

    // Create sample products with variants and tags
    const product1 = await Product.create({
      OwnerId: '1',
      name: 'Product 1',
      description: 'Description for Product 1',
      category: 'Category 1',
      brand: 'Brand 1',
    });

    const product2 = await Product.create({
      OwnerId: '2',
      name: 'Product 2',
      description: 'Description for Product 2',
      category: 'Category 2',
      brand: 'Brand 2',
    });

    // Create sample product variants for Product 1
    const variant1 = await ProductVariant.create({
      size: 'Small',
      color: 'Red',
      price: 19.99,
      quantity: 10,
      imageUrl: 'variant1.jpg',
      ProductId: product1.id, // Associate the variant with Product 1
    });

    const variant2 = await ProductVariant.create({
      size: 'Medium',
      color: 'Blue',
      price: 24.99,
      quantity: 15,
      imageUrl: 'variant2.jpg',
      ProductId: product1.id, // Associate the variant with Product 1
    });

    // Add tags to Product 1
    await product1.addProductTag(tag1);
    await product1.addProductTag(tag2);

    // Create sample product variants for Product 2
    const variant3 = await ProductVariant.create({
      size: 'Large',
      color: 'Green',
      price: 29.99,
      quantity: 8,
      imageUrl: 'variant3.jpg',
      ProductId: product2.id, // Associate the variant with Product 2
    });

    // Add tags to Product 2
    await product2.addProductTag(tag2);

    // Create a sample cart
    const cartResponse = await axios.post('http://localhost:3000/api/v1/carts/add', {
      productVariantId: 1,
      quantity: 99,
    }, {
      headers: {
        Cookie: 'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk1ODI0ODU3LCJleHAiOjE2OTU5MTEyNTd9.OZzy8YesfUHkm94kcZeV7MGdR8_uaIFyBbthkEcAn0k',
      },
    });

    if (cartResponse.status === 201) {
      console.log('Sample cart created successfully!');
    } else {
      console.error('Error creating sample cart:', cartResponse.statusText);
    }

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}

module.exports = createSampleData;
