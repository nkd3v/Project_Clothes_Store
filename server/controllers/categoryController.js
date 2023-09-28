// categoryController.js
const Category = require('../models/Category');

// Recursive function to retrieve categories and subcategories
async function getCategoriesRecursively(category) {
  const categoryData = {};
  const children = await Category.findAll({ where: { parentId: category.id } });

  if (children.length > 0) {
    for (const child of children) {
      categoryData[child.name] = await getCategoriesRecursively(child);
    }
  }

  return Object.keys(categoryData).length > 0 ? categoryData : null;
}

exports.getAllCategories = async (req, res) => {
  try {
    const rootCategories = await Category.findAll({ where: { parentId: null } });

    const categoriesObject = {};
    for (const rootCategory of rootCategories) {
      categoriesObject[rootCategory.name] = await getCategoriesRecursively(rootCategory);
    }

    // Simplify the structure by removing unnecessary fields
    const simplifiedCategories = simplifyCategories(categoriesObject);

    res.json(simplifiedCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Function to simplify the category structure
function simplifyCategories(categoriesObject) {
  const simplifiedCategories = {};

  for (const categoryName in categoriesObject) {
    const category = categoriesObject[categoryName];
    simplifiedCategories[categoryName] = simplifyCategories(category);
  }

  return Object.keys(simplifiedCategories).length > 0 ? simplifiedCategories : null;
}
