
const colorMappings = [
    { pattern: /\bดำ\b/gi, replacement: 'Black' },
    { pattern: /\bblack\b/gi, replacement: 'Black' },
    { pattern: /\bขาว\b/gi, replacement: 'White' },
    { pattern: /\bwhite\b/gi, replacement: 'White' },
    { pattern: /\bred\b/gi, replacement: 'Red' },
    { pattern: /\bblue\b/gi, replacement: 'Blue' },
    { pattern: /\bgreen\b/gi, replacement: 'Green' },
    { pattern: /\byellow\b/gi, replacement: 'Yellow' },
    { pattern: /\bpink\b/gi, replacement: 'Pink' },
    { pattern: /\bpurple\b/gi, replacement: 'Purple' },
    { pattern: /\borange\b/gi, replacement: 'Orange' },
    { pattern: /\bgray\b/gi, replacement: 'Gray' },
    { pattern: /\bbrown\b/gi, replacement: 'Brown' },
    { pattern: /\bbeige\b/gi, replacement: 'Beige' },
    // Add more color mappings as needed
];

const sizeMappings = [
    { pattern: /\bvery small\b/gi, replacement: 'XS' },
    { pattern: /\bextra small\b/gi, replacement: 'XS' },
    { pattern: /\bXS\b/gi, replacement: 'XS' },
    { pattern: /\bsmall\b/gi, replacement: 'S' },
    { pattern: /\bS\b/gi, replacement: 'S' },
    { pattern: /\bM\b/gi, replacement: 'M' },
    { pattern: /\bL\b/gi, replacement: 'L' },
    { pattern: /\bXL\b/gi, replacement: 'XL' },
    { pattern: /\bXXL\b/gi, replacement: 'XXL' },
    { pattern: /\b3XL\b/gi, replacement: '3XL' },
    // Add more size mappings as needed
];

function extractColors(text) {
    return extractKeywords(text, colorMappings);
}

function extractSizes(text) {
    return extractKeywords(text, sizeMappings);
}

function extractPriceRanges(inputString) {
    const regex = /฿?\s*(\d+(\.\d+)?)\s*(฿|บาท)?\s*(-|to)\s*฿?(\d+(\.\d+)?)\s*(฿|บาท)?/g;

    const priceRanges = [];
    let match;

    while ((match = regex.exec(inputString)) !== null) {
        const minPrice = parseFloat(match[1]);
        const maxPrice = parseFloat(match[5]);

        const priceRange = {
            minPrice,
            maxPrice,
        };

        priceRanges.push(priceRange);
    }

    return priceRanges;
}

function extractKeywords(text, keywordMappings) {
    let matchedKeywords = new Set();

    keywordMappings.forEach(({ pattern, replacement }) => {
        const matches = text.match(pattern);
        if (matches) {
            matches.forEach((match) => matchedKeywords.add(replacement));
        }
    });

    // Convert the Set back to an array if needed
    matchedKeywords = [...matchedKeywords];

    return matchedKeywords;
}

function replaceKeywords(text, keywordMappings) {
    let replacedText = text;

    keywordMappings.forEach(({ pattern, replacement }) => {
        replacedText = replacedText.replace(pattern, replacement);
    });

    return replacedText;
}

function replaceColors(text) {
    return replaceKeywords(text, colorMappings);
}

function replaceSizes(text) {
    return replaceKeywords(text, sizeMappings);
}

module.exports = { extractColors, extractSizes, extractPriceRanges, replaceColors, replaceSizes };

/*

const { extractColors, extractSizes } = require('./extractKeywordsModule');

const textForColors = "red, blue, green, and yellow.";
const matchedColors = extractColors(textForColors);
console.log(matchedColors); // ["Red", "Blue", "Green", "Yellow"]

const textForSizes = "XS, S, small, very small, M, L, XL, XXL, and 3XL.";
const matchedSizes = extractSizes(textForSizes);
console.log(matchedSizes); // ["XS", "S", "M", "L", "XL", "XXL", "3XL"]

*/