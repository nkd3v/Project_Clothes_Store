const Coupon = require('../models/Coupon'); // Adjust the import path as needed

// Function to create sample coupons
async function createSampleCoupons() {
    try {
        const coupon1 = await Coupon.create({
            code: 'SAVE20',
            discountPercentage: 20, // 20% discount
            expirationDate: new Date('2023-12-31'),
        });

        const coupon2 = await Coupon.create({
            code: 'FREESHIP',
            discountPercentage: 100, // 100% discount for free shipping
            expirationDate: new Date('2023-12-31'),
        });

        console.log('Sample coupons created successfully!');
    } catch (error) {
        console.error('Error creating sample coupons:', error);
    }
}

module.exports = createSampleCoupons;
