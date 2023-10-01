const categories = [
  'UNISEX',
  'BABY',
  'KIDS',
  'MEN',
  'UT เสื้อยืดลายกราฟิก',
  'WOMEN',
  'เครื่องแต่งกายอื่นๆ',
  'เด็กเล็ก 1-4 ปี',
  'เด็กแรกเกิด 0-1 ปี',
  'เสื้อ',
  'เสื้อเชิ้ดทางการ',
  'เสื้อเชิ้ต และ เบลาส์ (แขนยาว)',
  'เสื้อเชิ้ต และ เบลาส์ (แขนสั้น)',
  'เสื้อเชิ้ต และ เสื้อเบลาส์',
  'เสื้อโปโล',
  'เสื้อกันหนาว และ สินค้าสเวต (Sweat)',
  'เสื้อกันหนาว',
  'เสื้อคาร์ดิแกน',
  'เสื้อตัวใน และ ชุดชั้นใน AIRism',
  'เสื้อตัวใน และ ชุดชั้นใน HEATTECH',
  'เสื้อตัวนอก',
  'เสื้อผ้าถัก และ เสื้อสเวตเตอร์',
  'เสื้อฟลีซ (Fleece)',
  'เสื้อยืด (แขนยาว)',
  'เสื้อยืด (แขนสั้น)',
  'เสื้อยืด',
  'เสื้อยืด(แขนยาว)',
  'เสื้อยืด(แขนสั้น)',
  'กางเกง และ เลกกิ้ง',
  'กางเกง',
  'กางเกงเลกกิ้ง',
  'กางเกงขายาว',
  'กางเกงขายาวทางการ',
  'กางเกงขายาวลำลอง',
  'กางเกงขาสั้น',
  'กางเกงขาห้าส่วน',
  'กางเกงยีนส์',
  'กางเกงรีเลโค',
  'กางเกงลำลอง',
  'ชุดเด็กทารก',
  'ชุดเดรส',
  'ชุดชั้นใน',
  'ชุดนอน และ ชุดลำลอง',
  'ชุดนอน',
  'ชุดบอดี้สูท',
  'ชุดลำลอง และ ชุดนอน',
  'ชุดลำลอง',
  'ถุงเท้า',
  'บราท็อป',
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
          'เสื้อกันหนาว',
          'เสื้อคอกลม',
          'เสื้อเชิ้ดลำลอง (แขนยาว)',
          'เสื้อเชิ้ดลำลอง (แขนสั้น)',
          'เสื้อเชิ้ดทางการ'
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
          'กางเกงลำลอง'
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
          'เสื้อคาร์ดิแกน',
          'เสื้อเชิ้ต และ เบลาส์ (แขนสั้น)',
          'เสื้อเชิ้ต และ เบลาส์ (แขนยาว)',
          'ชุดนอน และ ชุดลำลอง',
          'บราท็อป'
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
          'กางเกงลำลอง',
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
          'ชุดลำลอง และ ชุดนอน',
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
          'สินค้าเด็กแรกเกิด 0-1 ปีทั้งหมด',
          'ชุดบอดี้สูท',
          'ชุดเด็กทารก',
          'เสื้อ',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อตัวนอก',
          'กางเกง และ เลกกิ้ง',
          'ชุดเดรส',
          'ถุงเท้า',
          'เครื่องแต่งกายอื่นๆ',
        ]
      },
      {
        name: 'เด็กเล็ก 1-4 ปี',
        items: [
          'สินค้าเด็กเล็ก 1-4 ปีทั้งหมด',
          'เสื้อ',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อตัวนอก',
          'กางเกง และ เลกกิ้ง',
          'ชุดเดรส',
          'ชุดนอน',
          'ชุดชั้นใน',
          'เสื้อตัวใน และ ชุดชั้นใน HEATTECH',
          'เสื้อตัวใน และ ชุดชั้นใน AIRism',
          'ถุงเท้า',
          'เครื่องแต่งกายอื่นๆ',
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
          'เสื้อยืด(แขนสั้น)',
          'เสื้อยืด(แขนยาว)',
          'เสื้อโปโล',
          'เสื้อกันหนาว',
          'เสื้อคอกลม',
          'เสื้อเชิ้ดลำลอง(แขนยาว)',
          'เสื้อเชิ้ดลำลอง(แขนสั้น)',
          'เสื้อเชิ้ดทางการ'
        ]
      },
      {
        name: 'กางเกง',
        items: [
          'กางเกงขายาวลำลอง',
          'กางเกงยีนส์',
          'กางเกงขายาวทางการ',
          'กางเกงขาห้าส่วน',
          'กางเกงขาสั้น'
        ]
      },
      {
        name: 'ชุดลำลอง',
        items: [
          'กางเกงลำลอง'
        ]
      }
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
          'เสื้อคาร์ดิแกน',
          'เสื้อเชิ้ต และ เบลาส์ (แขนสั้น)',
          'เสื้อเชิ้ต และ เบลาส์ (แขนยาว)',
          'บราท็อป'
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
        name: 'ชุดลำลอง',
        items: [
          'กางเกงลำลอง',
          'ชุดนอน และ ชุดลำลอง',
          'กางเกงรีเลโค'
        ]
      }
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
          'ชุดลำลอง',
          'ชุดนอน'
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
          'เสื้อ',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อตัวนอก',
          'กางเกง และ เลกกิ้ง',
          'ชุดเดรส',
          'ถุงเท้า',
          'เครื่องแต่งกายอื่นๆ',
        ]
      },
      {
        name: 'เด็กเล็ก 1-4 ปี',
        items: [
          'เสื้อ',
          'UT เสื้อยืดลายกราฟิก',
          'เสื้อตัวนอก',
          'กางเกง และ เลกกิ้ง',
          'ชุดเดรส',
          'ชุดนอน',
          'ชุดชั้นใน',
          'เสื้อตัวใน และ ชุดชั้นใน HEATTECH',
          'เสื้อตัวใน และ ชุดชั้นใน AIRism',
          'ถุงเท้า',
          'เครื่องแต่งกายอื่นๆ',
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