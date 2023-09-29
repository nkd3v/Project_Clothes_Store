const Category = require('../models/Category');

const categories = [
  'เสื้อ',
  'เสื้อทั้งหมด',
  'เสื้อยืด(แขนสั้น)',
  'เสื้อยืด(แขนยาว)',
  'เสื้อโปโล',
  'เสื้อกันหนาว',
  'เสื้อเชิ้ดลำลอง(แขนยาว)',
  'เสื้อเชิ้ดลำลอง(แขนสั้น)',
  'เสื้อเชิ้ดทางการ',
  'กางเกง',
];

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