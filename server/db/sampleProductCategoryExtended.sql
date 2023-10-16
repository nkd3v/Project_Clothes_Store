INSERT INTO Product_Category (productId, categoryId, createdAt, updatedAt)
VALUES
    ((SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย'), (SELECT id FROM Categories WHERE name = 'เสื้อฟลีซ (Fleece)'), datetime('now'), datetime('now')),
    ((SELECT id FROM Products WHERE name = 'เสื้อยืด ผ้าฟลีซ คอตั้ง แขนยาว มีลาย'), (SELECT id FROM Categories WHERE name = 'เสื้อยืด (แขนยาว)'), datetime('now'), datetime('now'));