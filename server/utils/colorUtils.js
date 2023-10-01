// const { fashionColors, findClosestColor } = require('./colorUtils');

// // Example usage:
// const hexValue = '#FF5733';
// const closestColor = findClosestColor(hexValue, fashionColors);
// console.log(`Closest color to ${hexValue}: ${closestColor.name}`);

const fashionColors = [
    { name: 'BLACK', hex: '#000000' },
    { name: 'WHITE', hex: '#FFFFFF' },
    { name: 'RED', hex: '#FF0000' },
    { name: 'BLUE', hex: '#0000FF' },
    { name: 'GREEN', hex: '#008000' },
    { name: 'YELLOW', hex: '#FFFF00' },
    { name: 'PINK', hex: '#FFC0CB' },
    { name: 'PURPLE', hex: '#800080' },
    { name: 'ORANGE', hex: '#FFA500' },
    { name: 'GRAY', hex: '#808080' },
    { name: 'BROWN', hex: '#A52A2A' },
    { name: 'BEIGE', hex: '#F5F5DC' },
];

function findClosestColor(hexValue, colorPalette) {
    // Convert the hex value to RGB
    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };

    // Calculate the Euclidean distance between two colors
    const calculateColorDistance = (color1, color2) => {
        const dr = color1.r - color2.r;
        const dg = color1.g - color2.g;
        const db = color1.b - color2.b;
        return Math.sqrt(dr * dr + dg * dg + db * db);
    };

    // Convert the input hex value to RGB
    const inputColor = hexToRgb(hexValue);

    // Find the closest color in the palette
    let closestColor = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const color of colorPalette) {
        const paletteColor = hexToRgb(color.hex);
        const distance = calculateColorDistance(inputColor, paletteColor);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestColor = color;
        }
    }

    return closestColor;
}

module.exports = {
    fashionColors,
    findClosestColor,
};
