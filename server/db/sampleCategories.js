const Category = require('../models/Category');
const { categories } = require('../data/categories');

// Create sample categories and hierarchy
async function createSampleCategories() {
  try {
    const categoryRecords = categories.map((categoryName) => ({
      name: categoryName,
    }));

    await Category.bulkCreate(categoryRecords);

    console.log('Sample categories and hierarchy created successfully!');
  } catch (error) {
    console.error('Error creating sample categories:', error);
  }
}

module.exports = createSampleCategories;
