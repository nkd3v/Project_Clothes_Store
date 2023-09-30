const Category = require('../models/Category');
const Product = require('../models/Product');
const ProductTag = require('../models/ProductTag');
const ProductVariant = require('../models/ProductVariant');
const User = require('../models/User');
const sequelize = require('../config/database'); // Import your database instance
const { Op } = require('sequelize');

// Helper function to convert a value to an array if it's not already an array
function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    return [value];
  }
  return [];
}

// List products that match brand, size, color, and tag criteria
exports.listProductsByCriteria = async (req, res) => {
  try {
    const { categoryId, minPrice, maxPrice } = req.query;
    const brands = toArray(req.query.brands);
    const sizes = toArray(req.query.sizes);
    const colors = toArray(req.query.colors);
    const tags = toArray(req.query.tags);

    const whereClause = {};
    if (categoryId) {
      whereClause.CategoryId = categoryId;
    }

    const productWhereClause = {};

    if (brands.length > 0) {
      productWhereClause['$User.username$'] = {
        [Op.in]: brands,
      };
    }

    const productTagWhereClause = {};
    if (tags.length > 0) {
      productTagWhereClause.name = {
        [Op.in]: tags,
      };
    }

    // Include the ProductVariant association to calculate price range and filter sizes/colors
    const products = await Product.findAll({
      where: whereClause,
      include: [
        {
          model: ProductVariant,
          attributes: ['colorName', 'color', 'price', 'size'],
          where: {
            [Op.and]: [
              {
                price: {
                  [Op.between]: [minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER],
                },
              },
              sizes.length > 0
                ? {
                    size: {
                      [Op.in]: sizes,
                    },
                  }
                : {},
              colors.length > 0
                ? {
                    colorName: {
                      [Op.in]: colors,
                    },
                  }
                : {},
            ],
          },
        },
        {
          model: User,
          attributes: [],
          where: productWhereClause,
        },
        {
          model: ProductTag,
          attributes: [],
          through: {
            attributes: [],
          },
          where: productTagWhereClause,
        },
      ],
      attributes: [
        'id',
        'name',
        'description',
        [sequelize.col('User.username'), 'brand'],
      ],
    });

    for (const product of products) {
      product.dataValues.minPrice = Math.min(
        ...product.ProductVariants.map((variant) => variant.price)
      );
      product.dataValues.maxPrice = Math.max(
        ...product.ProductVariants.map((variant) => variant.price)
      );
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Add a new product
exports.createProduct = async (req, res) => {
  const { name, description, category: categoryNames } = req.body;
  const tags = [...new Set(req.body['tags']?.split(',').map(item => item.trim()))];
  const ownerId = req.user.id;
  const files = req.files;

  if (!name || !description || !req.body['variants[][price]'] || !files || !ownerId || !categoryNames) {
    console.log([, !name, !description, !req.body['variants[][price]'], !typeof (files), !ownerId]);
    return res.status(400).json({ error: 'Invalid product data' });
  }

  if (!req.body['variants[][price]']) {
    return res.status(400).json({ error: 'Product require to have at least 1 variant' });
  }

  const variants = (() => {
    if (typeof (req.body['variants[][price]']) === 'string') {
      return [{
        price: req.body['variants[][price]'],
        size: req.body['variants[][size]'],
        color: req.body['variants[][color]'],
        quantity: req.body['variants[][quantity]']
      }];
    } else {
      return req.body['variants[][price]'].map((price, index) => ({
        price,
        size: req.body['variants[][size]'][index],
        color: req.body['variants[][color]'][index],
        quantity: req.body['variants[][quantity]'][index]
      }));
    }
  })();

  for (const variant of variants) {
    const { price, size, color, quantity } = variant;
    if (!price || !size || !color || !quantity) {
      return res.status(400).json({ error: 'Invalid variant data' });
    }
  }

  try {
    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(400).json({ error: 'A product with the same name already exists' });
    }

    console.log(Category);

    const categories = await Category.findAll({
      where: {
        name: categoryNames, // Assuming categoryNames is an array of category names
      },
    });
    

    // Create the Product instance
    const product = await Product.create({
      OwnerId: ownerId,
      name,
      description
    });

    await product.setCategories(categories);

    // Create the ProductVariant instances
    const productVariants = await ProductVariant.bulkCreate(variants.map((variant, index) => ({
      ProductId: product.id,
      size: variant.size,
      color: variant.color,
      price: variant.price,
      quantity: variant.quantity,
      imageUrl: `${req.protocol}://${req.get('host')}/api/v1/uploads/` + (req.files ? req.files[index].filename : 'default.png'),
    })));

    // Find or Create ProductTag instances with unique names
    const productTags = [];
    for (const tag of tags) {
      const [productTag] = await ProductTag.findOrCreate({
        where: { name: tag },
      });
      productTags.push(productTag);
    }

    // Associate Product with ProductTag (many-to-many)
    await product.addProductTags(productTags);

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// List all products with embedded product tags and variants
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        ProductTag, // Include the ProductTag association
        ProductVariant, // Include the ProductVariant association
      ],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single product by ID with embedded product tags and variants
exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId, {
      include: [
        ProductTag, // Include the ProductTag association
        ProductVariant, // Include the ProductVariant association
      ],
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listVariantsByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    // Find the product by its ID
    const product = await Product.findByPk(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find all variants associated with the product
    const variants = await ProductVariant.findAll({
      where: { ProductId: productId },
    });

    // Return the variants
    res.json(variants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, category, brand } = req.body;
  const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/api/v1/uploads/${req.file.filename}` : 'default.png';

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.imageUrl = imageUrl; // Update the image filename in the database
    product.category = category;
    product.brand = brand;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
