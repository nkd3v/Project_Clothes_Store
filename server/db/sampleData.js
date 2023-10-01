const sequelize = require('../config/database');
const createSampleCategories = require('./sampleCategories');
const createSampleUsers = require('./sampleUsers');
const createSampleProducts = require('./sampleProducts');
const createSampleCarts = require('./sampleCarts');
const createSampleCoupons = require('./sampleCoupons');

async function createSampleData() {
  try {
    await createSampleCategories();
    await createSampleUsers();
    await createSampleProducts();
    await createSampleCarts('user1', 'user1');
    await createSampleCoupons();

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}


module.exports = createSampleData;