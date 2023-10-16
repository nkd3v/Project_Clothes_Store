const Cart = require('../models/Cart');
const ProductVariant = require('../models/ProductVariant');
const CartItem = require('../models/CartItem');
const Coupon = require('../models/Coupon');
const User = require('../models/User');
const Product = require('../models/Product');

// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    const { productVariantId, quantity } = req.body;

    if (!Number.isInteger(productVariantId) || productVariantId <= 0) {
      return res.status(400).json({ error: 'Invalid productVariantId' });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    const productVariant = await ProductVariant.findByPk(productVariantId);

    if (!productVariant) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({
      where: { UserId: req.user.id },
    });

    if (!cart) {
      cart = await Cart.create({ UserId: req.user.id });
    }

    const existingCartItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductVariantId: productVariantId },
    });

    if (existingCartItem) {
      if (productVariant.quantity < existingCartItem.quantity + quantity) {
        return res.status(400).json({ error: 'Not enough quantity in stock' });
      }

      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      await CartItem.create({
        CartId: cart.id,
        ProductVariantId: productVariantId,
        quantity,
      });
    }

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.setProductQuantity = async (req, res) => {
  try {
    const { productVariantId, quantity } = req.body;

    if (!Number.isInteger(productVariantId) || productVariantId <= 0) {
      return res.status(400).json({ error: 'Invalid productVariantId' });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    const productVariant = await ProductVariant.findByPk(productVariantId);

    if (!productVariant) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (productVariant.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough quantity in stock' });
    }

    let cart = await Cart.findOne({
      where: { UserId: req.user.id },
    });

    if (!cart) {
      cart = await Cart.create({ UserId: req.user.id });
    }

    const existingCartItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductVariantId: productVariantId },
    });

    if (quantity === 0 && existingCartItem) {
      await existingCartItem.destroy();
    } else if (existingCartItem) {
      existingCartItem.quantity = quantity;
      await existingCartItem.save();
    } else if (quantity > 0) {
      await CartItem.create({
        CartId: cart.id,
        ProductVariantId: productVariantId,
        quantity,
      });
    }

    res.status(201).json({ message: 'Product quantity in cart updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// List products in the user's cart
exports.listCartProducts = async (req, res) => {
  try {
    const cart = (await Cart.findOne({
      where: { UserId: req.user.id },
      include: [
        {
          model: Coupon,
          attributes: ['code', 'discountPercentage'],
        },
        {
          model: CartItem,
          include: {
            model: ProductVariant,
            attributes: ['id', 'size', 'color', 'colorName', 'price', 'imageUrl'],
            include: {
              model: Product,
              attributes: ['name', 'description', 'gender', 'className', 'category'],
              include: {
                model: User,
                attributes: [['username', 'brand']],
              }
            }
          },
          attributes: ['quantity'],
        },
      ],
    }))?.toJSON();

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    console.log(cart);

    const coupon = cart.Coupon;

    // Calculate the total price with the applied coupon discount
    let totalPrice = cart.CartItems.reduce(
      (total, cartItem) =>
        total + cartItem.ProductVariant.price * cartItem.quantity,
      0
    );
    const totalPriceBeforeDiscount = totalPrice;
    let couponDiscount = 0;

    if (coupon) {
      couponDiscount = (coupon.discountPercentage / 100) * totalPrice;
      totalPrice -= couponDiscount;
    }

    console.log({coupon});

    res.json({ cartItems: cart.CartItems, totalPrice, totalPriceBeforeDiscount, couponDiscount, coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;

    // Check if the user's cart exists
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Check if the coupon code is valid
    const coupon = await Coupon.findOne({ where: { code: couponCode } });

    if (!coupon) {
      return res.status(404).json({ error: 'Invalid coupon code' });
    }

    // Check if the user hasn't used this coupon before
    const user = await User.findByPk(req.user.id);
    const hasUsedCoupon = await user.hasCoupon(coupon);

    if (hasUsedCoupon) {
      return res.status(400).json({ error: 'You have already used this coupon' });
    }

    // Associate the coupon with the cart
    cart.CouponId = coupon.id;
    await cart.save();

    return res.json({ message: 'Coupon applied successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeCoupon = async (req, res) => {
  try {
    // Check if the user's cart exists
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the associated coupon
    cart.CouponId = null;
    await cart.save();

    return res.json({ message: 'Coupon removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};