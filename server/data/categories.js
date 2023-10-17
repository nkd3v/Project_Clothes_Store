const categories = [
  'BABY',
  'KIDS',
  'MEN',
  'UNISEX',
  'UT เสื้อยืดลายกราฟิก',
  'WOMEN',
  'กระโปรง',
  'กางเกง',
  'กางเกงขายาว',
  'กางเกงขายาวทางการ',
  'กางเกงขายาวลำลอง',
  'กางเกงขาสั้น',
  'กางเกงขาห้าส่วน',
  'กางเกงทั้งหมด',
  'กางเกงยีนส์',
  'กางเกงเลกกิ้ง',
  'กางเกง และ เลกกิ้ง',
  'ชุดเด็กทารก',
  'ชุดบอดี้สูท',
  'เด็กแรกเกิด 0-1 ปี',
  'เด็กเล็ก 1-4 ปี',
  'เสื้อ',
  'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
  'เสื้อเชิ้ตทางการ',
  'เสื้อเชิ้ตลำลอง (แขนยาว)',
  'เสื้อเชิ้ตลำลอง (แขนสั้น)',
  'เสื้อเชิ้ต และ เสื้อเบลาส์',
  'เสื้อทั้งหมด',
  'เสื้อโปโล',
  'เสื้อผ้าถัก และ เสื้อสเวตเตอร์',
  'เสื้อฟลีซ (Fleece)',
  'เสื้อยืด',
  'เสื้อยืด (แขนยาว)',
  'เสื้อยืด (แขนสั้น)',
  'ชุดลำลอง',
  'ชุดนอน และ ชุดลำลอง',
];

const categoriesForCustomer = [
  {
    name: 'MEN',
    items: [
      {
        name: 'เสื้อ',
        items: [
          'เสื้อทั้งหมด',
          'เสื้อยืด (แขนสั้น)',
          'เสื้อยืด (แขนยาว)',
          'เสื้อโปโล',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อฟลีซ (Fleece)',
          'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
          'เสื้อเชิ้ตลำลอง (แขนยาว)',
          'เสื้อเชิ้ตลำลอง (แขนสั้น)',
          'เสื้อเชิ้ตทางการ'
        ]
      },
      {
        name: 'กางเกง',
        items: [
          'กางเกงทั้งหมด',
          'กางเกงขายาวลำลอง',
          'กางเกงยีนส์',
          'กางเกงขายาวทางการ',
          'กางเกงขาห้าส่วน',
          'กางเกงขาสั้น',
        ]
      },
    ]
  },
  {
    name: 'WOMEN',
    items: [
      {
        name: 'เสื้อ',
        items: [
          'เสื้อทั้งหมด',
          'เสื้อยืด (แขนสั้น)',
          'เสื้อยืด (แขนยาว)',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อฟลีซ (Fleece)',
          'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
          'เสื้อผ้าถัก และ เสื้อสเวตเตอร์',
        ]
      },
      {
        name: 'กางเกง',
        items: [
          'กางเกงทั้งหมด',
          'กางเกงขายาวลำลอง',
          'กางเกงยีนส์',
          'กางเกงขายาวทางการ',
          'กางเกงขาห้าส่วน',
          'กางเกงขาสั้น',
          'กางเกงเลกกิ้ง',
        ]
      },
      {
        name: 'กระโปรง',
        items: [
          'กระโปรง',
        ]
      },
      {
        name: 'ชุดลำลอง',
        items: [
          'ชุดนอน และ ชุดลำลอง',
        ]
      },
    ]
  },
  {
    name: 'KIDS',
    items: [
      {
        name: 'เสื้อ',
        items: [
          'เสื้อทั้งหมด',
          'เสื้อยืด',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อฟลีซ (Fleece)',
          'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
          'เสื้อเชิ้ต และ เสื้อเบลาส์',
        ]
      },
      {
        name: 'กางเกง',
        items: [
          'กางเกงทั้งหมด',
          'กางเกงขายาว',
          'กางเกงขาสั้น',
        ]
      },
    ]
  },
  {
    name: 'BABY',
    items: [
      {
        name: 'เด็กแรกเกิด 0-1 ปี',
        items: [
          'ชุดบอดี้สูท',
          'ชุดเด็กทารก',
        ]
      },
      {
        name: 'เด็กเล็ก 1-4 ปี',
        items: [
          'เสื้อ',
          'UT เสื้อยืดลายกราฟิก',
          'กางเกง และ เลกกิ้ง',
        ]
      },
    ]
  }
]

const categoriesForMerchant = [
  {
    name: 'MEN',
    items: [
      {
        name: 'เสื้อ',
        items: [
          'เสื้อยืด (แขนสั้น)',
          'เสื้อยืด (แขนยาว)',
          'เสื้อโปโล',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อฟลีซ (Fleece)',
          'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
          'เสื้อเชิ้ตลำลอง (แขนยาว)',
          'เสื้อเชิ้ตลำลอง (แขนสั้น)',
          'เสื้อเชิ้ตทางการ'
        ]
      },
      {
        name: 'กางเกง',
        items: [
          'กางเกงขายาวลำลอง',
          'กางเกงยีนส์',
          'กางเกงขายาวทางการ',
          'กางเกงขาห้าส่วน',
          'กางเกงขาสั้น',
        ]
      },
    ]
  },
  {
    name: 'WOMEN',
    items: [
      {
        name: 'เสื้อ',
        items: [
          'เสื้อยืด (แขนสั้น)',
          'เสื้อยืด (แขนยาว)',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อฟลีซ (Fleece)',
          'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
          'เสื้อผ้าถัก และ เสื้อสเวตเตอร์',
        ]
      },
      {
        name: 'กางเกง',
        items: [
          'กางเกงขายาวลำลอง',
          'กางเกงยีนส์',
          'กางเกงขายาวทางการ',
          'กางเกงขาห้าส่วน',
          'กางเกงขาสั้น',
          'กางเกงเลกกิ้ง',
        ]
      },
      {
        name: 'กระโปรง',
        items: [
          'กระโปรง',
        ]
      },
      {
        name: 'ชุดลำลอง',
        items: [
          'ชุดนอน และ ชุดลำลอง',
        ]
      },
    ]
  },
  {
    name: 'KIDS',
    items: [
      {
        name: 'เสื้อ',
        items: [
          'เสื้อยืด',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อฟลีซ (Fleece)',
          'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
          'เสื้อเชิ้ต และ เสื้อเบลาส์',
        ]
      },
      {
        name: 'กางเกง',
        items: [
          'กางเกงขายาว',
          'กางเกงขาสั้น',
        ]
      },
    ]
  },
  {
    name: 'BABY',
    items: [
      {
        name: 'เด็กแรกเกิด 0-1 ปี',
        items: [
          'ชุดบอดี้สูท',
          'ชุดเด็กทารก',
        ]
      },
      {
        name: 'เด็กเล็ก 1-4 ปี',
        items: [
          'เสื้อ',
          'UT เสื้อยืดลายกราฟิก',
          'กางเกง และ เลกกิ้ง',
        ]
      },
    ]
  }
]

module.exports = {
  categories,
  categoriesForCustomer,
  categoriesForMerchant
}