const Category = require('../models/Category');
const { categories } = require('../data/categories');

// Create sample categories and hierarchy
async function createSampleCategories() {
  try {
    for (const categoryName of categories) {
      await Category.create({ name: categoryName });
    }

    console.log('Sample categories and hierarchy created successfully!');
  } catch (error) {
    console.error('Error creating sample categories:', error);
  }
}

module.exports = createSampleCategories;
