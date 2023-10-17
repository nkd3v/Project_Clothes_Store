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
    ((SELECT id FROM Users WHERE username = 'picpic'), 'เสื้อสเวต แขนยาว PEANUTS Dance Time with Snoopy', 'ลายกราฟิกที่สะท้อนความเบิกบานใจในการ์ตูนแนววินเทจ Peanuts', 'WOMEN', 'เสื้อ', 'UT เสื้อยืดลายกราฟิก', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'เสื้อเชิ้ต ผ้าแฟลนเนล แขนยาว ปกธรรมดา ลายตาราง', 'เสื้อเชิ้ตผ้าแฟลนเนลเนื้อผ้าหนาแต่โปร่งสบาย บรัชผิวผ้าทั้งสองด้านเพื่อเพิ่มความอุ่นสบาย', 'MEN', 'เสื้อ', 'เสื้อเชิ้ตลำลอง (แขนยาว)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'เสื้อยืด SUPIMA COTTON คอกลม แขนสั้น', 'เสื้อจากผ้าซูพีมา®คอตตอนเกรดพรีเมียม 100% ปรับใหม่ให้เนื้อผ้าทนทานยิ่งขึ้น', 'MEN', 'เสื้อ', 'เสื้อยืด (แขนสั้น)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'เสื้อยืดแขนสั้น MICKEY MOUSE IN THAILAND UT', 'พบกับ Mickey Mouse และผองเพื่อนในประเทศไทยได้แล้ววันนี้!', 'MEN', 'เสื้อ', 'UT เสื้อยืดลายกราฟิก', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'เสื้อเชิ้ต ทอ Twill คอตั้ง แขนยาว สัมผัสนุ่ม', 'สัมผัสนุ่มสบายจากผ้าคอตตอน 100% คอปกตั้งในดีไซน์ที่ดูเรียบง่ายเป็นธรรมชาติ!', 'MEN', 'เสื้อ', 'เสื้อเชิ้ตลำลอง (แขนยาว)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'เสื้อเชิ้ต ผ้าคอตตอน Modal คอตั้ง แขนสั้น', 'เนื้อผ้าให้สัมผัสสบายทิ้งตัวสวย ดีไซน์ปกตั้งดูเนี้ยบ', 'MEN', 'เสื้อ', 'เสื้อเชิ้ตลำลอง (แขนสั้น)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'ยีนส์ Ultra Stretch Color ทรงสกินนี่', 'เนื้อผ้ายืดพิเศษ ยืดหยุ่นไร้ที่ติ ทรงรัดรูปใส่สบายไม่อึดอัด', 'MEN', 'กางเกง', 'กางเกงยีนส์', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'กางเกง จับจีบ ทรงกว้าง', 'กางเกงมากประโยชน์ที่ใส่สบายดูเรียบโก้ ทรงตรงดูเนี้ยบ (*ความยาววัดจากเป้าถึงปลายขากางเกง, โปรดดูตารางขนาดเพิ่มเติม)', 'MEN', 'กางเกง', 'กางเกงขายาวลำลอง', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'กางเกงขาสั้น Geared', 'กางเกงขาสั้นเคลือบสะท้อนหยดน้ำที่สวมใส่ได้ในทุกสภาพอากาศ มาพร้อมกระเป๋าด้านข้างมีซิปในสไตล์แอ็คทีฟ', 'MEN', 'กางเกง', 'กางเกงขาสั้น', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'กางเกง Smart ขา 5 ส่วน ผ้าคอตตอน', 'สวมใส่สบายในสไตล์เรียบหรู กางเกงมากประโยชน์ที่ใส่ได้ทุกโอกาส', 'MEN', 'กางเกง', 'กางเกงขาห้าส่วน', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'picpic'), 'KIDS เสื้อโปโล ผ้า Dry ปิเก้ แขนสั้น ลายทาง', 'เทคโนโลยีดราย (DRY) ให้สัมผัสสดชื่นยาวนาน ดีไซน์ลายทางกว้างในสีสันที่ดูสนุกสนาน', 'KIDS', 'เสื้อ', 'เสื้อเชิ้ต และ เสื้อเบลาส์', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'picpic'), 'GIRLS กางเกงขาสั้น Easy Color', 'ทรงหลวมใส่สบาย กางเกงขาสั้นผ้ามากประโยชน์ที่ใส่ได้หลายสไตล์', 'KIDS', 'กางเกง', 'กางเกงขาสั้น', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'picpic'), 'ชุดบอดี้สูท Joy of Print แขนสั้น 1 ชิ้น ลายดอกไม้', 'Joy of Print เป็นสตูดิโอด้านงานพิมพ์ในลอนดอนที่ก่อตั้งโดยดีไซเนอร์ Cath Kidston ในรูปแบบของโปรเจกต์เดี่ยวอิสระตัวใหม่', 'BABY', 'เด็กแรกเกิด 0-1 ปี', 'ชุดบอดี้สูท', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'picpic'), 'เสื้อยืด ผ้าคอตตอน คอกลม แขนยาว', 'ผ้าคอตตอนสัมผัสนุ่ม เนื้อผ้ายืดได้ทุกทางเพื่อความสะดวกในการเปลี่ยนชุด * ขนาด 70 - 90 ซม. มีกระดุมแป๊กที่ช่วงไหล่', 'BABY', 'เด็กเล็ก 1-4 ปี', 'เสื้อ', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'เสื้อแจ็คเก็ต ผ้าฟลีซ มีซิป แขนยาว', 'สัมผัสนุ่มอุ่นสบาย สีสันโดดเด่นทั้งด้านหน้าและด้านหลังตัดกับซิปสีขาว', 'MEN', 'เสื้อ', 'เสื้อฟลีซ (Fleece)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'GIRLS เสื้อยืดแขนสั้น Sanrio Characters: Kuromi & My Melody ทรงครอป UT', 'สัมผัสความน่ารักที่ได้รับความนิยมอย่างล้นหลามของ Kuromi & My Melody ในสไตล์กรันจ์ยุค 90.', 'KIDS', 'เสื้อ', 'UT เสื้อยืดลายกราฟิก', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'KIDS เสื้อยืด ผ้าฟลีซ ลายนูน (Ribbed) คอตั้ง แขนยาว ลายทาง', 'ผ้าฟลีซน้ำหนักเบาแต่ให้สัมผัสนุ่มอุ่นสบาย เสื้อผ้าลายนูนที่ให้สัมผัสพรีเมียมแบบผ้าถัก', 'KIDS', 'เสื้อ', 'เสื้อฟลีซ (Fleece)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'KIDS เสื้อสเวต แขนยาว KAWS', 'KAWS ศิลปินร่วมสมัย เปิดตัวคอลเลคชัน UT ในโอกาสเฉลิมฉลองการวางจำหน่ายหนังสือภาพ', 'KIDS', 'เสื้อ', 'เสื้อกันหนาว และ สินค้าสเวต (Sweat)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'ชุดทารก ผ้าบุนวม แขนยาว ลายสัตว์', 'ผ้าคอตตอน 100% ด้านในให้สัมผัสอ่อนโยนต่อผิว นวมผ้าควิลท์ช่วยให้เจ้าตัวเล็กรู้สึกอุ่นสบาย', 'BABY', 'เด็กแรกเกิด 0-1 ปี', 'ชุดเด็กทารก', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'เลกกิ้ง ทรงหลวม ลายจักรยาน', 'ทรงหลวมเปลี่ยนชุดง่าย ผสานความยืดหยุ่นเป็นพิเศษเพื่อความคล่องตัว', 'BABY', 'เด็กเล็ก 1-4 ปี', 'กางเกง และ เลกกิ้ง', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'เสื้อยืด คอกลม แขนยาว ผ้าลายนูน (Ribbed)', 'ผ้าลายนูนใส่สบายยืดหยุ่นได้มากเป็นพิเศษ ปกแต่งระบายในสไตล์เสื้อเบลาส์', 'BABY', 'เด็กเล็ก 1-4 ปี', 'เสื้อ', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'KIDS Soft ยีนส์ Ultra Stretch ผ้าเดนิม (Zip-Fly)', 'ยืดหยุ่นมากเป็นพิเศษเพื่อความคล่องตัวเป็นพิเศษ ขอบเอวยางยืดใส่สบาย', 'KIDS', 'กางเกง', 'กางเกงขายาว', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'xbit'), 'เสื้อยืดแขนสั้น STUDIO GHIBLI UT', 'คอลเลคชันแบบออริจินอลที่เผยให้เห็นจักรวาลของสตูดิโอจิบลิ (Studio Ghibli) ในหลากหลายรูปแบบ', 'BABY', 'เด็กเล็ก 1-4 ปี', 'UT เสื้อยืดลายกราฟิก', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'KIDS เสื้อยืด U AIRism คอตตอน คอกลม แขนสั้น', 'ผ้าผิวสัมผัสเนียนนุ่มดูคล้ายผ้าคอตตอน ใส่สบายในทรงหลวมสไตล์รีแล็กซ์', 'KIDS', 'เสื้อ', 'เสื้อยืด', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'เสื้อสเวต แขนยาว KAWS', 'KAWS ศิลปินร่วมสมัย เปิดตัวคอลเลคชัน UT ในโอกาสเฉลิมฉลองการวางจำหน่ายหนังสือภาพ', 'UNISEX', 'เสื้อ', 'เสื้อกันหนาว และ สินค้าสเวต (Sweat)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'เสื้อสเวตเตอร์ 3D Knit แขนยาว', 'ผ้าถักทรงเข้ารูปดูน่ารัก เนื้อผ้าบางกึ่งโปร่งแสงเหมาะสำหรับสวมใส่เล่นเลเยอร์', 'WOMEN', 'เสื้อ', 'เสื้อผ้าถัก และ เสื้อสเวตเตอร์', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'เสื้อฮู้ด ผ้าบรัชเจอร์ซี่ แขนยาว แบบสวมหัว', 'ทรงหลวมที่ไม่ว่าใครก็สวมใส่ได้ เนื้อผ้าบรัชด้านในให้สัมผัสนุ่มสบาย', 'MEN', 'เสื้อ', 'เสื้อกันหนาว และ สินค้าสเวต (Sweat)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'เสื้อเชิ้ต Extra Fine Cotton Broadcloth แขนยาว ปกกระดุม ลายตาราง', 'ผ้าคอตตอน 100% เส้นใยยาวพิเศษให้ผิวสัมผัสเรียบลื่นเป็นมันเงา พร้อมคุณสมบัติลดการเกิดรอยยับเพื่อให้ผ้านุ่มยาวนาน', 'MEN', 'เสื้อ', 'เสื้อเชิ้ตลำลอง (แขนยาว)', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'เสื้อเชิ้ต Extra Fine Cotton Broadcloth แขนยาว ปกธรรมดา ลายทาง', 'ผ้าคอตตอน 100% เส้นใยยาวพิเศษให้ผิวสัมผัสเรียบลื่นเป็นมันเงา พร้อมคุณสมบัติลดการเกิดรอยยับเพื่อให้ผ้านุ่มยาวนาน', 'UNISEX', 'เสื้อ', 'เสื้อเชิ้ตทางการ', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'กางเกง จับจีบ ทรงกว้าง (ความยาวพิเศษ 85 cm)*', 'กางเกงมากประโยชน์ที่ใส่สบายดูเรียบโก้ ทรงตรงสวย (*ความยาววัดจากเป้าถึงปลายขากางเกง, โปรดดูตารางขนาดเพิ่มเติม)', 'MEN', 'กางเกง', 'กางเกงขายาวทางการ', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'mannuy'), 'ชุดนอน ผ้าลินินผสม แขนสั้น ลายทาง', 'ชุดนอน ผ้าลินินผสม แขนสั้น ลายทาง', 'WOMEN', 'ชุดลำลอง', 'ชุดนอน และ ชุดลำลอง', NULL, datetime('now'), datetime('now')),
    ((SELECT id FROM Users WHERE username = 'tsloy'), 'เสื้อคาร์ดิแกน ผ้าฟลีซ บุขนนุ่มด้านใน คอกลม แขนยาว', 'ทรงเหลี่ยมสวมเป็นเสื้อตัวนอกได้อย่างลงตัว ซับในผ้าไมโครฟลีซเนียนนุ่ม', 'WOMEN', 'เสื้อ', 'เสื้อฟลีซ (Fleece)', NULL, datetime('now'), datetime('now'));
