const Category = require('../models/Category');

categories = [
  {
    name: 'MEN',
    children: [
      {
        name: 'เสื้อ',
        children: [
          'เสื้อทั้งหมด',
          'เสื้อยืด(แขนสั้น)',
          'เสื้อยืด(แขนยาว)',
          'เสื้อโปโล',
          'เสื้อกันหนาว',
          'เสื้อเชิ้ดลำลอง(แขนยาว)',
          'เสื้อเชิ้ดลำลอง(แขนสั้น)',
          'เสื้อเชิ้ดทางการ'
        ]
      },
      {
        name: 'กางเกง',
        children: [
          
        ]
      },
      {
        name: 'ชุดลำลอง',
        children: [
          
        ]
      }
    ]
  },
  {
    name: 'WOMEN',
    children: [
      
    ]
  },
  {
    name: 'KIDS',
    children: [
      
    ]
  },
  {
    name: 'BABY',
    children: [
      
    ]
  }
]

// Controller function to get the categories hierarchy
exports.getAllCategoryHierarchy = async (req, res) => {
  try {
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Controller to get all category IDs and names as a mapping
exports.getAllCategoriesWithIdsAndNames = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.findAll();

    // Create a mapping of category IDs to names
    const categoryMapping = {};
    categories.forEach(category => {
      categoryMapping[category.id] = category.name;
    });

    return res.status(200).json(categoryMapping);
  } catch (error) {
    console.error('Error fetching category IDs and names:', error);
    return res.status(500).json({ error: 'Unable to fetch category IDs and names' });
  }
}
