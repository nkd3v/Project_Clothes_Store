-- Insert values into the 'ProductVariant' table with 'createdAt' and 'updatedAt' columns
INSERT INTO ProductVariants (size, colorName, color, price, quantity, imageUrl, ProductId, createdAt, updatedAt)
VALUES
    ('S', 'GRAY', '#4F5151', 490, 8, '1-gray.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด U AIRism คอตตอน คอกลม แขน 1/2 ทรงหลวม'), datetime('now'), datetime('now')),
    ('M', 'BLACK', '#2A292C', 490, 8, '1-black.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด U AIRism คอตตอน คอกลม แขน 1/2 ทรงหลวม'), datetime('now'), datetime('now')),
    ('L', 'BEIGE', '#BEA680', 490, 8, '1-beige.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด U AIRism คอตตอน คอกลม แขน 1/2 ทรงหลวม'), datetime('now'), datetime('now')),
    ('XL', 'BROWN', '#A38453', 490, 8, '1-brown.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด U AIRism คอตตอน คอกลม แขน 1/2 ทรงหลวม'), datetime('now'), datetime('now')),
    ('S', 'BLUE', '#282B3A', 590, 8, '2-blue.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย'), datetime('now'), datetime('now')),
    ('M', 'BLUE', '#282B3A', 590, 8, '2-blue.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย'), datetime('now'), datetime('now')),
    ('L', 'BLUE', '#282B3A', 590, 8, '2-blue.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย'), datetime('now'), datetime('now')),
    ('XL', 'GRAY', '#B7B3BB', 590, 8, '2-gray.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย'), datetime('now'), datetime('now')),
    ('XXL', 'GRAY', '#B7B3BB', 590, 8, '2-gray.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย'), datetime('now'), datetime('now')),
    ('3XL', 'GRAY', '#B7B3BB', 590, 8, '2-gray.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย'), datetime('now'), datetime('now')),
    ('XS', 'WHITE', '#EBEBEB', 790, 8, '3-white.webp', (SELECT id FROM Products WHERE name = 'เสื้อโปโล Dry ผ้าปิเก้ แขนสั้น'), datetime('now'), datetime('now')),
    ('S', 'GRAY', '#C2C4C7', 790, 8, '3-gray.webp', (SELECT id FROM Products WHERE name = 'เสื้อโปโล Dry ผ้าปิเก้ แขนสั้น'), datetime('now'), datetime('now')),
    ('M', 'BLACK', '#252527', 790, 8, '3-black.webp', (SELECT id FROM Products WHERE name = 'เสื้อโปโล Dry ผ้าปิเก้ แขนสั้น'), datetime('now'), datetime('now')),
    ('L', 'RED', '#782A37', 790, 8, '3-red.webp', (SELECT id FROM Products WHERE name = 'เสื้อโปโล Dry ผ้าปิเก้ แขนสั้น'), datetime('now'), datetime('now')),
    ('XS', 'BLACK', '#191D20', 490, 8, '4-black.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด คอกลม แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('S', 'RED', '#871E25', 490, 8, '4-red.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด คอกลม แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('M', 'YELLOW', '#D5AE30', 490, 8, '4-yellow.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด คอกลม แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('L', 'BLUE', '#15458C', 490, 8, '4-blue.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด คอกลม แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('L', 'ORANGE', '#D48171', 590, 8, '5-orange.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ ผ้าถัก ขนนุ่ม คอกลม แขนยาว'), datetime('now'), datetime('now')),
    ('XL', 'BEIGE', '#CEBEAD', 590, 8, '5-beige.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ ผ้าถัก ขนนุ่ม คอกลม แขนยาว'), datetime('now'), datetime('now')),
    ('XXL', 'GREEN', '#2B3A39', 590, 8, '5-green.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ ผ้าถัก ขนนุ่ม คอกลม แขนยาว'), datetime('now'), datetime('now')),
    ('3XL', 'PURPLE', '#41376A', 590, 8, '5-purple.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ ผ้าถัก ขนนุ่ม คอกลม แขนยาว'), datetime('now'), datetime('now')),
    ('S', 'BLACK', '#212324', 1490, 8, '6-black.webp', (SELECT id FROM Products WHERE name = 'กระโปรง ผ้าคอตตอน'), datetime('now'), datetime('now')),
    ('M', 'BEIGE', '#C4AE96', 1490, 8, '6-beige.webp', (SELECT id FROM Products WHERE name = 'กระโปรง ผ้าคอตตอน'), datetime('now'), datetime('now')),
    ('M', 'GRAY', '#3D3E44', 1490, 8, '7-gray.webp', (SELECT id FROM Products WHERE name = 'กางเกง คาร์โก้ ทรงกว้าง ขาตรง'), datetime('now'), datetime('now')),
    ('L', 'GREEN', '#627059', 1490, 8, '7-green.webp', (SELECT id FROM Products WHERE name = 'กางเกง คาร์โก้ ทรงกว้าง ขาตรง'), datetime('now'), datetime('now')),
    ('L', 'GRAY', '#44454B', 1490, 8, '8-gray.webp', (SELECT id FROM Products WHERE name = 'ยีนส์ ผ้ายืด ขาตรง ทรงเข้ารูป'), datetime('now'), datetime('now')),
    ('XL', 'BLUE', '#264266', 1490, 8, '8-blue.webp', (SELECT id FROM Products WHERE name = 'ยีนส์ ผ้ายืด ขาตรง ทรงเข้ารูป'), datetime('now'), datetime('now')),
    ('XL', 'GRAY', '#323335', 1290, 8, '9-gray.webp', (SELECT id FROM Products WHERE name = 'กางเกง Smart ลาย Glen Checked'), datetime('now'), datetime('now')),
    ('S', 'GRAY', '#3A3A4A', 790, 8, '10-gray.webp', (SELECT id FROM Products WHERE name = 'กางเกง ผ้าคอตตอน ขา 5 ส่วน ทรงหลวม'), datetime('now'), datetime('now')),
    ('M', 'WHITE', '#EDE5DE', 790, 8, '10-white.webp', (SELECT id FROM Products WHERE name = 'กางเกง ผ้าคอตตอน ขา 5 ส่วน ทรงหลวม'), datetime('now'), datetime('now')),
    ('M', 'BLACK', '#292524', 590, 8, '11-black.webp', (SELECT id FROM Products WHERE name = 'กางเกงขาสั้น ผ้าเดนิม เจอร์ซี่'), datetime('now'), datetime('now')),
    ('L', 'BLUE', '#2C477A', 590, 8, '11-blue.webp', (SELECT id FROM Products WHERE name = 'กางเกงขาสั้น ผ้าเดนิม เจอร์ซี่'), datetime('now'), datetime('now')),
    ('XS', 'WHITE', '#F1E7DC', 990, 8, '12-white.webp', (SELECT id FROM Products WHERE name = 'กางเกงเลกกิ้ง Ultra Stretch'), datetime('now'), datetime('now')),
    ('S', 'BLACK', '#211E1F', 990, 8, '12-black.webp', (SELECT id FROM Products WHERE name = 'กางเกงเลกกิ้ง Ultra Stretch'), datetime('now'), datetime('now')),
    ('L', 'GRAY', '#8E8D7A', 990, 8, '13-gray.webp', (SELECT id FROM Products WHERE name = 'เสื้อสเวต แขนยาว PEANUTS Dance Time with Snoopy'), datetime('now'), datetime('now')),
    ('XL', 'BEIGE', '#E5E1D5', 678, 8, '14-Beige.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ผ้าแฟลนเนล แขนยาว ปกธรรมดา ลายตาราง'), datetime('now'), datetime('now')),
    ('L', 'BEIGE', '#E5E1D5', 678, 8, '14-Beige_L.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ผ้าแฟลนเนล แขนยาว ปกธรรมดา ลายตาราง'), datetime('now'), datetime('now')),
    ('XL', 'GREE', '#46533C', 678, 8, '14-Green_XL.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ผ้าแฟลนเนล แขนยาว ปกธรรมดา ลายตาราง'), datetime('now'), datetime('now')),
    ('L', 'GREEN', '#46533C', 678, 8, '14-Green_XL.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ผ้าแฟลนเนล แขนยาว ปกธรรมดา ลายตาราง'), datetime('now'), datetime('now')),
    ('M', 'GREEN', '#46533C', 678, 8, '14-Green_XL.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ผ้าแฟลนเนล แขนยาว ปกธรรมดา ลายตาราง'), datetime('now'), datetime('now')),
    ('L', 'WHITE', '#E9E8EB', 990, 8, '15-White-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด SUPIMA COTTON คอกลม แขนสั้น'), datetime('now'), datetime('now')),
    ('L', 'BLACK', '#000000', 990, 8, '15-Black-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด SUPIMA COTTON คอกลม แขนสั้น'), datetime('now'), datetime('now')),
    ('M', 'BEIGE', '#DCD1C5', 990, 8, '15-Beige-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด SUPIMA COTTON คอกลม แขนสั้น'), datetime('now'), datetime('now')),
    ('L', 'BEIGE', '#DCD1C5', 990, 8, '15-Beige-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด SUPIMA COTTON คอกลม แขนสั้น'), datetime('now'), datetime('now')),
    ('XL', 'BEIGE', '#DCD1C5', 990, 8, '15-Beige-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด SUPIMA COTTON คอกลม แขนสั้น'), datetime('now'), datetime('now')),
    ('L', 'BLUE', '#222D54', 123, 8, '16-Navy-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืดแขนสั้น MICKEY MOUSE IN THAILAND UT'), datetime('now'), datetime('now')),
    ('M', 'BLUE', '#222D54', 123, 8, '16-Navy-L_2.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืดแขนสั้น MICKEY MOUSE IN THAILAND UT'), datetime('now'), datetime('now')),
    ('M', 'GREEN', '#354C52', 234, 8, '17-DarkGreen-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ทอ Twill คอตั้ง แขนยาว สัมผัสนุ่ม'), datetime('now'), datetime('now')),
    ('L', 'ORANGE', '#AC622F', 234, 8, '17-Orange-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ทอ Twill คอตั้ง แขนยาว สัมผัสนุ่ม'), datetime('now'), datetime('now')),
    ('L', 'ORANGE', '#B78216', 345, 8, '18-Mustard-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ผ้าคอตตอน Modal คอตั้ง แขนสั้น'), datetime('now'), datetime('now')),
    ('M', 'GREEN', '#787659', 345, 8, '18-Olive-L.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต ผ้าคอตตอน Modal คอตั้ง แขนสั้น'), datetime('now'), datetime('now')),
    ('L', 'WHITE', '#F7F7F5', 456, 8, '19-White-L.webp', (SELECT id FROM Products WHERE name = 'ยีนส์ Ultra Stretch Color ทรงสกินนี่'), datetime('now'), datetime('now')),
    ('XL', 'WHITE', '#F7F7F5', 456, 8, '19-White-L.webp', (SELECT id FROM Products WHERE name = 'ยีนส์ Ultra Stretch Color ทรงสกินนี่'), datetime('now'), datetime('now')),
    ('XL', 'GRAY', '#808080', 567, 8, '20-Gray-L.webp', (SELECT id FROM Products WHERE name = 'กางเกง จับจีบ ทรงกว้าง'), datetime('now'), datetime('now')),
    ('M', 'BLACK', '#000000', 567, 8, '20-Black-L.webp', (SELECT id FROM Products WHERE name = 'กางเกง จับจีบ ทรงกว้าง'), datetime('now'), datetime('now')),
    ('M', 'ORANGE', '#A56345', 678, 8, '21-DarlOramge-L.webp', (SELECT id FROM Products WHERE name = 'กางเกงขาสั้น Geared'), datetime('now'), datetime('now')),
    ('S', 'ORANGE', '#A56345', 678, 8, '21-DarlOramge-L.webp', (SELECT id FROM Products WHERE name = 'กางเกงขาสั้น Geared'), datetime('now'), datetime('now')),
    ('XXL', 'WHITE', '#EEEBE5', 678, 8, '22-White-L.webp', (SELECT id FROM Products WHERE name = 'กางเกง Smart ขา 5 ส่วน ผ้าคอตตอน'), datetime('now'), datetime('now')),
    ('XL', 'WHITE', '#EEEBE5', 678, 8, '22-White-L.webp', (SELECT id FROM Products WHERE name = 'กางเกง Smart ขา 5 ส่วน ผ้าคอตตอน'), datetime('now'), datetime('now')),
    ('S', 'YELLOW', '#E4BB48', 789, 8, '23-Yellow-L.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อโปโล ผ้า Dry ปิเก้ แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('M', 'YELLOW', '#E4BB48', 789, 8, '23-Yellow-L.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อโปโล ผ้า Dry ปิเก้ แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('L', 'YELLOW', '#E4BB48', 789, 8, '23-Yellow-L.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อโปโล ผ้า Dry ปิเก้ แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('XL', 'YELLOW', '#E4BB48', 789, 8, '23-Yellow-L.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อโปโล ผ้า Dry ปิเก้ แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('S', 'WHITE', '#ECE4DB', 234, 8, '24-OffWhite.webp', (SELECT id FROM Products WHERE name = 'GIRLS กางเกงขาสั้น Easy Color'), datetime('now'), datetime('now')),
    ('M', 'WHITE', '#ECE4DB', 234, 8, '24-OffWhite.webp', (SELECT id FROM Products WHERE name = 'GIRLS กางเกงขาสั้น Easy Color'), datetime('now'), datetime('now')),
    ('L', 'WHITE', '#ECE4DB', 234, 8, '24-OffWhite.webp', (SELECT id FROM Products WHERE name = 'GIRLS กางเกงขาสั้น Easy Color'), datetime('now'), datetime('now')),
    ('XL', 'WHITE', '#ECE4DB', 234, 8, '24-OffWhite.webp', (SELECT id FROM Products WHERE name = 'GIRLS กางเกงขาสั้น Easy Color'), datetime('now'), datetime('now')),
    ('S', 'PINK', '#F4E1DE', 222, 8, '25-Pink.webp', (SELECT id FROM Products WHERE name = 'ชุดบอดี้สูท Joy of Print แขนสั้น 1 ชิ้น ลายดอกไม้'), datetime('now'), datetime('now')),
    ('M', 'PINK', '#F4E1DE', 222, 8, '25-Pink.webp', (SELECT id FROM Products WHERE name = 'ชุดบอดี้สูท Joy of Print แขนสั้น 1 ชิ้น ลายดอกไม้'), datetime('now'), datetime('now')),
    ('L', 'PINK', '#F4E1DE', 222, 8, '25-Pink.webp', (SELECT id FROM Products WHERE name = 'ชุดบอดี้สูท Joy of Print แขนสั้น 1 ชิ้น ลายดอกไม้'), datetime('now'), datetime('now')),
    ('L', 'BLUE', '#5E7DAB', 222, 8, '26-Blue.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าคอตตอน คอกลม แขนยาว'), datetime('now'), datetime('now')),
    ('L', 'GREEN', '#506A5D', 222, 8, '26-Green.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าคอตตอน คอกลม แขนยาว'), datetime('now'), datetime('now')),
    ('XS', 'GRAY', '#7F888F', 1290, 18, '27-gray.webp', (SELECT id FROM Products WHERE name = 'เสื้อแจ็คเก็ต ผ้าฟลีซ มีซิป แขนยาว'), datetime('now'), datetime('now')),
    ('S', 'BLUE', '#0D4488', 1290, 18, '27-blue.webp', (SELECT id FROM Products WHERE name = 'เสื้อแจ็คเก็ต ผ้าฟลีซ มีซิป แขนยาว'), datetime('now'), datetime('now')),
    ('L', 'PINK', '#F0B8CF', 390, 18, '29-pink.webp', (SELECT id FROM Products WHERE name = 'GIRLS เสื้อยืดแขนสั้น Sanrio Characters: Kuromi & My Melody ทรงครอป UT'), datetime('now'), datetime('now')),
    ('M', 'WHITE', '#EAEAE5', 390, 18, '30-white.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อยืด ผ้าฟลีซ ลายนูน (Ribbed) คอตั้ง แขนยาว ลายทาง'), datetime('now'), datetime('now')),
    ('L', 'BLACK', '#131F2F', 390, 18, '30-black.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อยืด ผ้าฟลีซ ลายนูน (Ribbed) คอตั้ง แขนยาว ลายทาง'), datetime('now'), datetime('now')),
    ('M', 'BLACK', '#131F2F', 790, 18, '31-black.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อสเวต แขนยาว KAWS'), datetime('now'), datetime('now')),
    ('M', 'PINK', '#F1DDD2', 590, 18, '32-pink.webp', (SELECT id FROM Products WHERE name = 'ชุดทารก ผ้าบุนวม แขนยาว ลายสัตว์'), datetime('now'), datetime('now')),
    ('L', 'BROWN', '#B09082', 590, 18, '32-brown.webp', (SELECT id FROM Products WHERE name = 'ชุดทารก ผ้าบุนวม แขนยาว ลายสัตว์'), datetime('now'), datetime('now')),
    ('XS', 'GREEN', '#406152', 590, 18, '33-green.webp', (SELECT id FROM Products WHERE name = 'เลกกิ้ง ทรงหลวม ลายจักรยาน'), datetime('now'), datetime('now')),
    ('XS', 'WHITE', '#F4F2EC', 590, 18, '34-white.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด คอกลม แขนยาว ผ้าลายนูน (Ribbed)'), datetime('now'), datetime('now')),
    ('S', 'PINK', '#F4D9DA', 590, 18, '34-pink.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืด คอกลม แขนยาว ผ้าลายนูน (Ribbed)'), datetime('now'), datetime('now')),
    ('M', 'BLACK', '#424349', 790, 18, '35-black.webp', (SELECT id FROM Products WHERE name = 'KIDS Soft ยีนส์ Ultra Stretch ผ้าเดนิม (Zip-Fly)'), datetime('now'), datetime('now')),
    ('L', 'BLUE', '#98B2CB', 790, 18, '35-blue.webp', (SELECT id FROM Products WHERE name = 'KIDS Soft ยีนส์ Ultra Stretch ผ้าเดนิม (Zip-Fly)'), datetime('now'), datetime('now')),
    ('3XL', 'YELLOW', '#D5AE30', 790, 18, '36-yellow.webp', (SELECT id FROM Products WHERE name = 'เสื้อยืดแขนสั้น STUDIO GHIBLI UT'), datetime('now'), datetime('now')),
    ('XL', 'GREEN', '#0A6444', 390, 18, '28-green.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อยืด U AIRism คอตตอน คอกลม แขนสั้น'), datetime('now'), datetime('now')),
    ('3XL', 'BLUE', '#C1DFE8', 390, 18, '28-blue.webp', (SELECT id FROM Products WHERE name = 'KIDS เสื้อยืด U AIRism คอตตอน คอกลม แขนสั้น'), datetime('now'), datetime('now')),
    ('XXL', 'PINK', '#DFBCBC', 390, 12, '37-pink.webp', (SELECT id FROM Products WHERE name = 'เสื้อคาร์ดิแกน ผ้าฟลีซ บุขนนุ่มด้านใน คอกลม แขนยาว'), datetime('now'), datetime('now')),
    ('S', 'BLACK', '#1B1A1D', 990, 12, '38-black.webp', (SELECT id FROM Products WHERE name = 'เสื้อสเวต แขนยาว KAWS'), datetime('now'), datetime('now')),
    ('XS', 'BROWN', '#805940', 1490, 12, '39-brown.webp', (SELECT id FROM Products WHERE name = 'เสื้อสเวตเตอร์ 3D Knit แขนยาว'), datetime('now'), datetime('now')),
    ('M', 'BEIGE', '#D3C8C2', 1490, 12, '39-beige.webp', (SELECT id FROM Products WHERE name = 'เสื้อสเวตเตอร์ 3D Knit แขนยาว'), datetime('now'), datetime('now')),
    ('M', 'BLUE', '#383C3F', 1990, 11, '40-blue.webp', (SELECT id FROM Products WHERE name = 'เสื้อฮู้ด ผ้าบรัชเจอร์ซี่ แขนยาว แบบสวมหัว'), datetime('now'), datetime('now')),
    ('M', 'BROWN', '#7F6D52', 1990, 10, '40-brown.webp', (SELECT id FROM Products WHERE name = 'เสื้อฮู้ด ผ้าบรัชเจอร์ซี่ แขนยาว แบบสวมหัว'), datetime('now'), datetime('now')),
    ('3XL', 'GRAY', '#35414D', 1990, 13, '40-gray.webp', (SELECT id FROM Products WHERE name = 'เสื้อฮู้ด ผ้าบรัชเจอร์ซี่ แขนยาว แบบสวมหัว'), datetime('now'), datetime('now')),
    ('3XL', 'RED', '#3B2637', 990, 3, '41-red.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต Extra Fine Cotton Broadcloth แขนยาว ปกกระดุม ลายตาราง'), datetime('now'), datetime('now')),
    ('XS', 'WHITE', '#F0F2F4', 990, 20, '42-white.webp', (SELECT id FROM Products WHERE name = 'เสื้อเชิ้ต Extra Fine Cotton Broadcloth แขนยาว ปกธรรมดา ลายทาง'), datetime('now'), datetime('now')),
    ('M', 'BLACK', '#282828', 1490, 20, '43-black.webp', (SELECT id FROM Products WHERE name = 'กางเกง จับจีบ ทรงกว้าง (ความยาวพิเศษ 85 cm)*'), datetime('now'), datetime('now')),
    ('L', 'BEIGE', '#BCAB93', 1490, 20, '43-beige.webp', (SELECT id FROM Products WHERE name = 'กางเกง จับจีบ ทรงกว้าง (ความยาวพิเศษ 85 cm)*'), datetime('now'), datetime('now')),
    ('L', 'ORANGE', '#F6C1A1', 990, 20, '44-orange.webp', (SELECT id FROM Products WHERE name = 'ชุดนอน ผ้าลินินผสม แขนสั้น ลายทาง'), datetime('now'), datetime('now')),
    ('3XL', 'BEIGE', '#BBA28C', 390, 12, '37-beige.webp', (SELECT id FROM Products WHERE name = 'เสื้อคาร์ดิแกน ผ้าฟลีซ บุขนนุ่มด้านใน คอกลม แขนยาว'), datetime('now'), datetime('now'));
