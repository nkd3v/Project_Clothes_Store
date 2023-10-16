
const colorMappings = [
    { pattern: /ดำ/gi, replacement: 'BLACK' },
    { pattern: /\bblack\b/gi, replacement: 'BLACK' },
    { pattern: /ขาว/gi, replacement: 'WHITE' },
    { pattern: /\bwhite\b/gi, replacement: 'WHITE' },
    { pattern: /\bred\b/gi, replacement: 'RED' },
    { pattern: /แดง/gi, replacement: 'RED' },
    { pattern: /\bblue\b/gi, replacement: 'BLUE' },
    { pattern: /ฟ้า/gi, replacement: 'BLUE' },
    { pattern: /น้ำเงิน/gi, replacement: 'BLUE' },
    { pattern: /\bgreen\b/gi, replacement: 'GREEN' },
    { pattern: /เขียว/gi, replacement: 'GREEN' },
    { pattern: /\byellow\b/gi, replacement: 'YELLOW' },
    { pattern: /เหลือง/gi, replacement: 'YELLOW' },
    { pattern: /\bpink\b/gi, replacement: 'PINK' },
    { pattern: /ชมพู/gi, replacement: 'PINK' },
    { pattern: /\bpurple\b/gi, replacement: 'PURPLE' },
    { pattern: /ม่วง/gi, replacement: 'PURPLE' },
    { pattern: /\borange\b/gi, replacement: 'ORANGE' },
    { pattern: /ส้ม/gi, replacement: 'ORANGE' },
    { pattern: /\bgray\b/gi, replacement: 'GRAY' },
    { pattern: /เทา/gi, replacement: 'GRAY' },
    { pattern: /\bbrown\b/gi, replacement: 'BROWN' },
    { pattern: /น้ำตาล/gi, replacement: 'BROWN' },
    { pattern: /\bbeige\b/gi, replacement: 'BEIGE' },
    { pattern: /ครีม/gi, replacement: 'BEIGE' },
    // Add more color mappings as needed
];

const sizeMappings = [
    { pattern: /very small/gi, replacement: 'XS' },
    { pattern: /เล็กมาก/gi, replacement: 'XS' },
    { pattern: /extra small/gi, replacement: 'XS' },
    { pattern: /XS/gi, replacement: 'XS' },
    { pattern: /small/gi, replacement: 'S' },
    { pattern: /เล็ก/gi, replacement: 'S' },
    { pattern: /\bS\b/gi, replacement: 'S' },
    { pattern: /\bM\b/gi, replacement: 'M' },
    { pattern: /ปานกลาง/gi, replacement: 'M' },
    { pattern: /\bL\b/gi, replacement: 'L' },
    { pattern: /ใหญ่/gi, replacement: 'L' },
    { pattern: /XXL/gi, replacement: 'XXL' },
    { pattern: /ใหญ่มากๆ/gi, replacement: 'XXL' },
    { pattern: /3XL/gi, replacement: '3XL' },
    { pattern: /ใหญ่ที่สุด/gi, replacement: '3XL' },
    { pattern: /XL/gi, replacement: 'XL' },
    { pattern: /ใหญ่มาก/gi, replacement: 'XL' },
    // Add more size mappings as needed
];

const genderMappings = [
    { pattern: /หญิง/gi, replacement: 'WOMEN' },
    { pattern: /สตรี/gi, replacement: 'WOMEN' },
    { pattern: /women/gi, replacement: 'WOMEN' },
    { pattern: /ชาย/gi, replacement: 'MEN' },
    { pattern: /men/gi, replacement: 'MEN' },
    { pattern: /baby/gi, replacement: 'BABY' },
    { pattern: /ทารก/gi, replacement: 'BABY' },
    { pattern: /แบเบาะ/gi, replacement: 'BABY' },
    { pattern: /เด็กน้อย/gi, replacement: 'BABY' },
    { pattern: /kids/gi, replacement: 'KIDS' },
    { pattern: /เด็ก/gi, replacement: 'KIDS' },
    { pattern: /unisex/gi, replacement: 'UNISEX' },
    { pattern: /สองเพศ/gi, replacement: 'UNISEX' },
    { pattern: /ทุกเพศ/gi, replacement: 'UNISEX' },
]

const tokens = [
    'เสื้อ',
    'กางเกง',
    'ลาย',
    'กราฟิก',
    'ฟลีซ',
    'ฟลีซ',
    'กันหนาว',
    'ถัก',
    'ผ้า',
    'สเวตเตอร์',
    'สเวต',
    'ขา',
    'ยาว',
    'แขน',
    'ยีนส์',
    'สั้น',
    'ทางการ',
    'ลำลอง',
    'เลกกิ้ง',
    'อยู่บ้าน',
    'กระโปรง',
    'คอกลม',
    'หลวม',
    'คอตตอน',
    'นุ่ม',
    'ทรงกว้าง',
    'คาร์โก้',
    'ยืด',
    'เข้ารูป',
    'เดนิม',
    'เจอร์ซี่',
    'แฟลนเนล',
    'ตาราง',
    'ปก',
    'เชิ้ต',
    'ทอ',
    'คอตั้ง',
    'สกินนี่',
    'แจ็คเก็ต',
    'โปโล',
    'ลำลอง',
    'ขายาว',
    'ห้าส่วน',
    'ขาสั้น',
    'ปิเก้',
    'ดรอป',
    'นูน',
    'เบลาส์',
    'ดอกไม้',
    'ลายสัตว์',
    'จักรยาน',
    'แรกเกิด',
    'สี',
    'ผ้า',
    'ขนาด',
    'ราคา',
    'ประเภท',
    'บาท',
    'และ',
    'สำหรับ',
    'มี',
    'พร้อม',
    'เพื่อ',
    'ให้',
    'แบบ',
    'ลักษณะ',
    'ปกกระดุม',
];

const redundentTokens = [
    'สี',
    'ผ้า',
    'ขนาด',
    'ราคา',
    'ประเภท',
    'บาท',
    'และ',
    'สำหรับ',
    'มี',
    'พร้อม',
    'เพื่อ',
    'ให้',
    'แบบ',
    'ลักษณะ',
    'ชุด',
];

function splitTextWithTokens(text, tokens) {
    const tokenRegExp = new RegExp(tokens.join('|'), 'g');
    return text.replace(tokenRegExp, match => ' ' + match + ' ').trim();
}

function removeRedundentTokens(arr) {
    return arr.filter(item => !redundentTokens.includes(item));
}

function splitText(text) {
    return splitTextWithTokens(text, tokens);
}

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

function extractGenders(text) {
    return extractKeywords(text, genderMappings);
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
        replacedText = replacedText.replace(pattern, ' ' + replacement + ' ');
    });

    return replacedText;
}

function replaceColors(text) {
    return replaceKeywords(text, colorMappings);
}

function replaceSizes(text) {
    return replaceKeywords(text, sizeMappings);
}

function replaceGenders(text) {
    return replaceKeywords(text, genderMappings);
}

module.exports = { extractColors, extractSizes, extractGenders, extractPriceRanges, replaceColors, replaceSizes, replaceGenders, splitText, removeRedundentTokens };

/*

const { extractColors, extractSizes } = require('./extractKeywordsModule');

const textForColors = "red, blue, green, and yellow.";
const matchedColors = extractColors(textForColors);
console.log(matchedColors); // ["Red", "Blue", "Green", "Yellow"]

const textForSizes = "XS, S, small, very small, M, L, XL, XXL, and 3XL.";
const matchedSizes = extractSizes(textForSizes);
console.log(matchedSizes); // ["XS", "S", "M", "L", "XL", "XXL", "3XL"]

*/