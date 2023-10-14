-- Insert values into the 'Product' table with 'createdAt' and 'updatedAt' columns
INSERT INTO Products (OwnerId, name, description, gender, className, category, tags, createdAt, updatedAt)
VALUES
    ((SELECT id FROM Users WHERE username = 'xbit'), 'เสื้อยืด U AIRism คอตตอน คอกลม แขน 1/2 ทรงหลวม', 'มาพร้อมประสิทธิภาพของผ้า ''แอริซึ่ม'' (''AIRism'') ที่ให้ลุคแบบผ้าคอตตอน ขอบคอเสื้อที่เล็กลงได้ลุคที่ดูเนี้ยบสะอาดตา', 'UNISEX', 'เสื้อ', 'เสื้อยืด (แขนสั้น)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'picpic'), 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย', 'ดีไซน์คอตั้งสวมใส่ได้หลายโอกาสและเล่นเลเยอร์ได้ง่าย ผ้าฟลีซสัมผัสนุ่มช่วยเสริมลุคให้ดูดีมีระดับ', 'MEN', 'เสื้อ', 'เสื้อยืด (แขนยาว)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'เสื้อโปโล Dry ผ้าปิเก้ แขนสั้น', 'ผ้าคอตตอนผสมโพลีเอสเตอร์รีไซเคิลให้สัมผัสนุ่มและทนทาน องค์ประกอบหลักของเสื้อรุ่นนี้ยังคงพัฒนาอย่างไม่หยุดยั้ง', 'MEN', 'เสื้อ', 'เสื้อโปโล', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'เสื้อยืด คอกลม แขนสั้น ลายทาง', 'ทรงหลวมสวมใส่ได้หลายโอกาส จัดแต่งสไตล์ได้ง่ายทั้งลุคแคชชวลและทางการ', 'WOMEN', 'เสื้อ', 'เสื้อยืด (แขนสั้น)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'เสื้อยืด ผ้าฟลีซ ผ้าถัก ขนนุ่ม คอกลม แขนยาว', 'ผ้าฟลีซเนื้อนุ่มน้ำหนักเบาและให้ความอบอุ่นได้ดี ผสานความเรียบง่ายของผ้าฟลีซและความหรูหราของผ้าถักได้อย่างลงตัว', 'WOMEN', 'เสื้อ', 'เสื้อยืด (แขนยาว)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'กระโปรง ผ้าคอตตอน', 'ทรงเอสวยงามสะดุดตา ขอบเอวยางยืดสวมใส่สบาย', 'WOMEN', 'กระโปรง', 'กระโปรง', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'picpic'), 'กางเกง คาร์โก้ ทรงกว้าง ขาตรง', 'กางเกงคาร์โก้จากผ้าคอตตอน 100% ขอบเอวยางยืดสวมใส่สบาย', 'WOMEN', 'กางเกง', 'กางเกงขายาวลำลอง', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'picpic'), 'ยีนส์ ผ้ายืด ขาตรง ทรงเข้ารูป', 'ทรงสวยเข้ารูป ทำจากผ้าเดนิมยืดเพื่อความสบาย', 'WOMEN', 'กางเกง', 'กางเกงยีนส์', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'กางเกง Smart ลาย Glen Checked', 'เนื้อผ้ายืดได้สองทางเพื่อความคล่องตัว ช่วงเอวกระชับเข้ารูปสวมใส่สบาย (*ความยาววัดจากเป้าถึงปลายขากางเกง, โปรดดูตารางขนาดเพิ่มเติม)', 'WOMEN', 'กางเกง', 'กางเกงขายาวทางการ', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'กางเกง ผ้าคอตตอน ขา 5 ส่วน ทรงหลวม', 'ผ้าคอตตอนปรับใหม่ให้หนายิ่งขึ้น ดูเนี้ยบสวมใส่ได้ทุกโอกาส', 'WOMEN', 'กางเกง', 'กางเกงขาห้าส่วน', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'กางเกงขาสั้น ผ้าเดนิม เจอร์ซี่', 'เนื้อผ้านุ่มเบาสบาย มีกระเป๋าด้านข้างเพื่อความสะดวก', 'WOMEN', 'กางเกง', 'กางเกงขาสั้น', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'กางเกงเลกกิ้ง Ultra Stretch', 'ไอเทมโฉมใหม่กับเอวปกติที่ใส่สบายยิ่งขึ้น เลกกิ้งมากประโยชน์ปรับดีไซน์ใหม่ด้วยเนื้อผ้าและดีเทลที่ล้ำหน้ายิ่งขึ้น', 'WOMEN', 'กางเกง', 'กางเกงเลกกิ้ง', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'picpic'), 'เสื้อสเวต แขนยาว PEANUTS Dance Time with Snoopy', 'ลายกราฟิกที่สะท้อนความเบิกบานใจในการ์ตูนแนววินเทจ Peanuts', 'WOMEN', 'เสื้อ', 'UT เสื้อยืดลายกราฟิก', NULL, datetime('now'), datetime('now'));

