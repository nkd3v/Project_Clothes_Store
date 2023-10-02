const Category = require('../models/Category');
const Product = require('../models/Product');
const ProductTag = require('../models/ProductTag');
const ProductVariant = require('../models/ProductVariant');
const CategoryTag = require('../models/CategoryTag');
const { extractColors, extractSizes, extractPriceRanges } = require('../utils/keywordUtils');
const User = require('../models/User');
const { findMinMaxSize } = require('../utils/sizeUtils');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    return [value];
  }
  return [];
}

exports.listProductsByCriteria = async (req, res) => {
  try {
    const { categoryId, minPrice, maxPrice } = req.query;
    let rawKeywords = req.query.keywords || '';

    let brands, sizes, colors, retVal;

    brands = [];
    console.log({ rawKeywords });
    console.log({ what: extractColors(rawKeywords) });

    retVal = extractColors(rawKeywords)
    colors = retVal.matchedKeywords;
    rawKeywords = retVal.extractedText.trim();
    console.log({ colors, rawKeywords });

    retVal = extractSizes(rawKeywords);
    sizes = retVal.matchedKeywords;
    rawKeywords = retVal.extractedText.trim();
    console.log({ rawKeywords });

    retVal = extractPriceRanges(rawKeywords)
    const priceRanges = retVal.priceRanges;
    rawKeywords = retVal.extractedText.trim();

    const keywordsArray = rawKeywords?.split(' ');
    brands = [...toArray(req.query.brands), ...brands];
    sizes = [...toArray(req.query.sizes), ...sizes];
    colors = [...toArray(req.query.colors), ...colors];

    let priceRange = {};
    if (minPrice && maxPrice) {
      priceRange = { minPrice, maxPrice }
    }
    else if (priceRanges.length > 0) {
      priceRange = priceRanges[0];
    }

    console.log({ sizes, colors, priceRange });
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
        // 
      };
    }

    const products = (await Product.findAll({
      where: whereClause,
      include: [
        {
          model: ProductVariant,
          attributes: ['id', 'colorName', 'color', 'price', 'size'],
          where: {
            [Op.and]: [
              { price: { [Op.between]: [priceRange.minPrice || 0, priceRange.maxPrice || Number.MAX_SAFE_INTEGER], }, },
              sizes.length > 0 ? { size: { [Op.in]: sizes, }, } : {},
              colors.length > 0 ? { colorName: { [Op.in]: colors, }, } : {},
            ],
          },
        },
        {
          model: User,
          attributes: [],
          where: productWhereClause,
        },
      ],
      attributes: [
        'id',
        'name',
        'description',
        [sequelize.col('User.username'), 'brand'],
        'gender',
        'className',
        'category',
        'tags',
        'categoryTags',
      ],
    })).map((product) => product.get({ plain: true }));

    for (const product of products) {
      product.minPrice = Math.min(
        ...product.ProductVariants.map((variant) => variant.price)
      );
      product.maxPrice = Math.max(
        ...product.ProductVariants.map((variant) => variant.price)
      );
    }

    for (const product of products) {
      const { minSize, maxSize } = findMinMaxSize(product);
      product.minSize = minSize;
      product.maxSize = maxSize;
    }

    console.log(products);
    console.log(keywordsArray);

    const filteredProducts = !keywordsArray
      ? products
      : products.filter((product) => {
        console.log(product.categoryTags);
        return keywordsArray.every((keyword) => {
          const lowercaseKeyword = keyword.toLowerCase();
          const match = (
            product.name.toLowerCase().includes(lowercaseKeyword) ||
            product.description.toLowerCase().includes(lowercaseKeyword) ||
            product.brand.toLowerCase().includes(lowercaseKeyword) ||
            product.gender.toLowerCase().includes(lowercaseKeyword) ||
            product.className.toLowerCase().includes(lowercaseKeyword) ||
            product.category.toLowerCase().includes(lowercaseKeyword) ||
            product.tags?.toLowerCase().includes(lowercaseKeyword) ||
            product.categoryTags?.toLowerCase().includes(lowercaseKeyword) ||
            product.ProductVariants.some((variant) =>
              variant.colorName.toLowerCase().includes(lowercaseKeyword)
            ) ||
            product.ProductVariants.some((variant) =>
              variant.size.toLowerCase().includes(lowercaseKeyword)
            )
          );
          delete product.tags;
          delete product.categoryTags;
          return match
        });
      });

    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new product
exports.createProduct = async (req, res) => {
  const { name, description, gender, className, category, tags } = req.body;
  const ownerId = req.user.id;
  const files = req.files;

  if (!name || !description || !req.body['variants[][price]'] || !files || !ownerId || !gender || !className || !category) {
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

    // Create the Product instance
    const product = await Product.create({
      OwnerId: ownerId,
      name,
      description,
      gender,
      className,
      category,
    });

    // Create the ProductVariant instances
    const productVariants = await ProductVariant.bulkCreate(variants.map((variant, index) => ({
      ProductId: product.id,
      size: variant.size,
      color: variant.color,
      price: variant.price,
      quantity: variant.quantity,
      imageUrl: 'default.png',
      tags,
    })));

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
