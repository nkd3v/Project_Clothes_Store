const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductVariant = require('./ProductVariant'); // Import the ProductVariant model
const Order = require('./Order');
const { getMethods } = require('../utils/getMethods');

const OrderItem = sequelize.define('OrderItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
    totalPriceBeforeDiscount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    couponDiscount: {
        type: DataTypes.DECIMAL(10, 2),
    }
});

OrderItem.belongsTo(ProductVariant);
ProductVariant.hasMany(OrderItem);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

const calculateTotalPrices = async (orderItem) => {
    const order = await orderItem.getOrder();
    const coupon = await order.getCoupon();
    const productVariant = await orderItem.getProductVariant();

    orderItem.totalPriceBeforeDiscount = orderItem.quantity * productVariant.price;
    if (coupon) {
        orderItem.couponDiscount = orderItem.totalPriceBeforeDiscount * coupon.discountPercentage / 100.;
    } else {
        orderItem.couponDiscount = 0;
    }
    orderItem.totalPrice = orderItem.totalPriceBeforeDiscount - orderItem.couponDiscount;
};

OrderItem.beforeCreate(async (orderItem, options) => {
    await calculateTotalPrices(orderItem);
});

OrderItem.beforeBulkCreate(async (instances, options) => {
    for (const instance of instances) {
        await calculateTotalPrices(instance);
    }
});

module.exports = OrderItem;