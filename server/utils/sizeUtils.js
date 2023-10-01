// utils/findMinMaxSize.js

// Define the possible size order
const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

// Function to find the minimum and maximum size based on size order
function findMinMaxSize(product) {
    let minSize = null;
    let maxSize = null;

    for (const variant of product.ProductVariants) {
        if (!minSize || sizeOrder.indexOf(variant.size) < sizeOrder.indexOf(minSize.size)) {
            minSize = variant.size;
        }
        if (!maxSize || sizeOrder.indexOf(variant.size) > sizeOrder.indexOf(maxSize.size)) {
            maxSize = variant.size;
        }
    }

    return { minSize, maxSize };
}

module.exports = { findMinMaxSize };
