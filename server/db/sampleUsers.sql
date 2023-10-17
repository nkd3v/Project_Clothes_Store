-- Insert values into the 'User' table with 'createdAt' and 'updatedAt' columns
INSERT INTO Users (username, password, email, firstName, lastName, dateOfBirth, gender, address1, city, state, country, postalCode, phoneNumber, role, createdAt, updatedAt)
VALUES
    ('user1', '$2a$10$Q8D.avI8SzfhOBcPTAAY9.l6HRYEm0Vo9lJ4gK.sJDlxb/vwwps/6', 'user1@example.com', 'John', 'Doe', '1990-01-15', 'Male', '123 Main St', 'City 1', 'State 1', 'Country 1', '12345', '123-456-7890', 'ซื้อ', datetime('now'), datetime('now')),
    ('user2', '$2a$10$UAJ7A4lgOdI4cvFyXTNV0evhpUHHZtnT4s2MrYL6JJp0aKaDbipMa', 'user2@example.com', 'Jane', 'Smith', '1985-03-20', 'Female', '456 Elm St', 'City 2', 'State 2', 'Country 2', '67890', '987-654-3210', 'ขาย', datetime('now'), datetime('now')),
    ('picpic', '$2a$10$HmX2Rz6R1wcb9iqNMu32nuMqMc2ofZ6wGcps3am1RWEqRkQbSPJU6', 'picpic@example.com', 'Jane', 'Smith', '1985-03-20', 'Female', '456 Elm St', 'City 2', 'State 2', 'Country 2', '67890', '987-654-3210', 'ขาย', datetime('now'), datetime('now')),
    ('xbit', '$2a$10$HmX2Rz6R1wcb9iqNMu32nuMqMc2ofZ6wGcps3am1RWEqRkQbSPJU6', 'xbit@example.com', 'Jane', 'Smith', '1985-03-20', 'Female', '456 Elm St', 'City 2', 'State 2', 'Country 2', '67890', '987-654-3210', 'ขาย', datetime('now'), datetime('now')),
    ('mannuy', '$2a$10$HmX2Rz6R1wcb9iqNMu32nuMqMc2ofZ6wGcps3am1RWEqRkQbSPJU6', 'mannuy@example.com', 'Jane', 'Smith', '1985-03-20', 'Female', '456 Elm St', 'City 2', 'State 2', 'Country 2', '67890', '987-654-3210', 'ขาย', datetime('now'), datetime('now')),
    ('tsloy', '$2a$10$HmX2Rz6R1wcb9iqNMu32nuMqMc2ofZ6wGcps3am1RWEqRkQbSPJU6', 'tsloy@example.com', 'Jane', 'Smith', '1985-03-20', 'Female', '456 Elm St', 'City 2', 'State 2', 'Country 2', '67890', '987-654-3210', 'ขาย', datetime('now'), datetime('now'));
