const Category = require('../models/Category');

const categories = [
  'BABY',
  'KIDS',
  'MEN',
  'UT เสื้อยืดลายกราฟิก',
  'WOMEN',
  'เสื้อ',
  'เสื้อเชิ้ดทางการ',
  'เสื้อเชิ้ดลำลอง(แขนยาว)',
  'เสื้อเชิ้ดลำลอง(แขนสั้น)',
  'เสื้อเชิ้ต และ เบลาส์ (แขนยาว)',
  'เสื้อเชิ้ต และ เบลาส์ (แขนสั้น)',
  'เสื้อโปโล',
  'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
  'เสื้อกันหนาว',
  'เสื้อคาร์ดิแกน',
  'เสื้อทั้งหมด',
  'เสื้อผ้าถัก และ เสื้อสเวตเตอร์',
  'เสื้อฟลีซ (Fleece)',
  'เสื้อยืด (แขนยาว)',
  'เสื้อยืด (แขนสั้น)',
  'เสื้อยืด(แขนยาว)',
  'เสื้อยืด(แขนสั้น)',
  'กางเกง',
  'กางเกงเลกกิ้ง',
  'กางเกงขายาวทางการ',
  'กางเกงขายาวลำลอง',
  'กางเกงขาสั้น',
  'กางเกงขาห้าส่วน',
  'กางเกงทั้งหมด',
  'กางเกงยีนส์',
  'กางเกงรีเลโค',
  'กางเกงลำลอง',
  'ชุดนอน และ ชุดลำลอง',
  'ชุดลำลอง',
  'ชุดลำลองทั้งหมด',
  'บราท็อป',
  
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