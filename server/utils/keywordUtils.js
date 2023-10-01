
const colorMappings = [
    { pattern: /\bดำ\b/gi, replacement: 'BLACK' },
    { pattern: /\bblack\b/gi, replacement: 'BLACK' },
    { pattern: /\bขาว\b/gi, replacement: 'WHITE' },
    { pattern: /\bwhite\b/gi, replacement: 'WHITE' },
    { pattern: /\bred\b/gi, replacement: 'RED' },
    { pattern: /\bblue\b/gi, replacement: 'BLUE' },
    { pattern: /\bgreen\b/gi, replacement: 'GREEN' },
    { pattern: /\byellow\b/gi, replacement: 'YELLOW' },
    { pattern: /\bpink\b/gi, replacement: 'PINK' },
    { pattern: /\bpurple\b/gi, replacement: 'PURPLE' },
    { pattern: /\borange\b/gi, replacement: 'ORANGE' },
    { pattern: /\bgray\b/gi, replacement: 'GRAY' },
    { pattern: /\bbrown\b/gi, replacement: 'BROWN' },
    { pattern: /\bbeige\b/gi, replacement: 'BEIGE' },
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

const genderMappings = [
    { pattern: /\bmen\b/gi, replacement: 'MEN' },
    { pattern: /\bชาย\b/gi, replacement: 'MEN' },
    { pattern: /\bwomen\b/gi, replacement: 'WOMEN' },
    { pattern: /\bหญิง\b/gi, replacement: 'WOMEN' },
    { pattern: /\bสตรี\b/gi, replacement: 'WOMEN' },
    { pattern: /\bbaby\b/gi, replacement: 'BABY' },
    { pattern: /\bทารก\b/gi, replacement: 'BABY' },
    { pattern: /\bแบเบาะ\b/gi, replacement: 'BABY' },
    { pattern: /\bเด็กน้อย\b/gi, replacement: 'BABY' },
    { pattern: /\bkids\b/gi, replacement: 'KIDS' },
    { pattern: /\bเด็ก\b/gi, replacement: 'KIDS' },
]

function extractKeywords(text, keywordMappings) {
    let matchedKeywords = new Set();
    let extractedText = text;

    keywordMappings.forEach(({ pattern, replacement }) => {
        const matches = extractedText.match(pattern);
        if (matches) {
            matches.forEach((match) => {
                matchedKeywords.add(replacement);
                extractedText = extractedText.replace(match, '');
            });
        }
    });

    matchedKeywords = [...matchedKeywords];

    return { matchedKeywords, extractedText };
}

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
    let extractedText = inputString;

    while ((match = regex.exec(extractedText)) !== null) {
        const minPrice = parseFloat(match[1]);
        const maxPrice = parseFloat(match[5]);

        const priceRange = {
            minPrice,
            maxPrice,
        };

        priceRanges.push(priceRange);

        // Remove the matched text from extractedText
        extractedText = extractedText.replace(match[0], '');
    }

    return { priceRanges, extractedText };
}

function extractKeywordsNoRemove(text, keywordMappings) {
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