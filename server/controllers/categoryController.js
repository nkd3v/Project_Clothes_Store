const Category = require('../models/Category');
const { categoriesForCustomer, categoriesForMerchant } = require('../data/categories');

// Controller function to get the categories hierarchy
exports.getAllCategoryHierarchyForCustomer = async (req, res) => {
  try {
    res.json(categoriesForCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Controller function to get the categories hierarchy
exports.getAllCategoryHierarchyForMerchant = async (req, res) => {
  try {
    res.json(categoriesForMerchant);
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
