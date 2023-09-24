-- Create the user table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    dateOfBirth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address VARCHAR(255),
    phoneNumber VARCHAR(20),
    role ENUM('Customer', 'Merchant', 'Admin', 'Moderator'),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample user data
INSERT INTO users (username, password, email, firstName, lastName, dateOfBirth, gender, address, phoneNumber, profileImageUrl, role) VALUES
    ('user1', '$2a$10$HZsA4OJcyMdXrVGmFmZfMuhJHz694QboKTfod1FdhbCzsXN8MwocS', 'user1@chiqko.pp.ua', 'John', 'Doe', '1990-01-15', 'Male', '123 Main St, City', '+1234567890' , 'Customer'),
    ('merchant1', '$2a$10$PkEIKZcl1L7iuS2ZBWuqoue26di3dH8suxQ7NR/1HUmZqxl41/5qe', 'merchant@chiqko.pp.ua', 'Merchant', 'User', '1985-05-20', 'Female', '456 Elm St, Town', '+9876543210', 'Merchant'),
    ('admin1', '$2a$10$r1l6NdFeGQ5S74cwQEWyFerXFs5pnJIifi/ARNCrdkUNNbrJA/c8y', 'admin@chiqko.pp.ua', 'Admin', 'User', '1975-08-10', 'Male', '789 Oak St, Village', '+1122334455', 'Admin'),
    ('moderator1', '$2a$10$.nYYEN6bBCQMEy3Zw5PGK.FHMp98lAYBJnGnQ00E94ZTFo1r6hkOy', 'moderator@chiqko.pp.ua', 'Moderator', 'User', '1995-03-25', 'Other', '567 Pine St, Town', '+9988776655', 'Moderator');


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    size_stock_avliable VARCHAR(255),
    imageUrl VARCHAR(255),
    category VARCHAR(255),
    brand VARCHAR(255),
    tag VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample product data
INSERT INTO products (name, description, price,size_stock_avliable, imageUrl, category, brand,tag) VALUES
    ('Product 1', 'This is product 1', 29.99,'S:1 ,M:2 ,L:3 ,XL:4', 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Clothing', 'Brand A','sex:man, color:green'),
    ('Product 2', 'This is product 2', 39.99,'S:1 ,M:2 ,L:3 ,XL:4', 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Shoes', 'Brand B','sex:women, color:blue'),
    ('Product 3', 'This is product 3', 49.99,'S:1 ,M:2 ,L:3 ,XL:4', 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Accessories', 'Brand C','sex:boy, color:red');
