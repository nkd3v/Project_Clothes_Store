const Category = require('../models/Category');

// Create sample categories and hierarchy
async function createSampleCategories() {
    try {
        // Create top-level categories
        const menCategory = await Category.create({ name: 'Men', level: 0 });
        const womenCategory = await Category.create({ name: 'Women', level: 0 });

        // Create sub-categories for Men
        const menClothingCategory = await Category.create({
            name: 'Clothing',
            level: 1,
            parentId: menCategory.id,
        });
        const menFootwearCategory = await Category.create({
            name: 'Footwear',
            level: 1,
            parentId: menCategory.id,
        });

        // Create sub-categories for Women
        const womenClothingCategory = await Category.create({
            name: 'Clothing',
            level: 1,
            parentId: womenCategory.id,
        });
        const womenFootwearCategory = await Category.create({
            name: 'Footwear',
            level: 1,
            parentId: womenCategory.id,
        });

        // Create sub-categories for Men's Clothing
        const menTShirtsCategory = await Category.create({
            name: 'T-Shirts',
            level: 2,
            parentId: menClothingCategory.id,
        });
        const menJeansCategory = await Category.create({
            name: 'Jeans',
            level: 2,
            parentId: menClothingCategory.id,
        });

        // Create sub-categories for Women's Clothing
        const womenDressesCategory = await Category.create({
            name: 'Dresses',
            level: 2,
            parentId: womenClothingCategory.id,
        });
        const womenSkirtsCategory = await Category.create({
            name: 'Skirts',
            level: 2,
            parentId: womenClothingCategory.id,
        });

        console.log('Sample categories and hierarchy created successfully!');
    } catch (error) {
        console.error('Error creating sample categories:', error);
    }
};

module.exports = createSampleCategories;
