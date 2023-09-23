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
    profileImageUrl VARCHAR(255),
    role ENUM('Customer', 'Merchant', 'Admin', 'Moderator'),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample user data
INSERT INTO users (username, password, email, firstName, lastName, dateOfBirth, gender, address, phoneNumber, profileImageUrl, role) VALUES
    ('user1', '$2a$10$HZsA4OJcyMdXrVGmFmZfMuhJHz694QboKTfod1FdhbCzsXN8MwocS', 'user1@chiqko.pp.ua', 'John', 'Doe', '1990-01-15', 'Male', '123 Main St, City', '+1234567890', 'https://chiqko.pp.ua/api/v1/uploads/avatar.png', 'Customer'),
    ('merchant1', '$2a$10$PkEIKZcl1L7iuS2ZBWuqoue26di3dH8suxQ7NR/1HUmZqxl41/5qe', 'merchant@chiqko.pp.ua', 'Merchant', 'User', '1985-05-20', 'Female', '456 Elm St, Town', '+9876543210', 'https://chiqko.pp.ua/api/v1/uploads/avatar.png', 'Merchant'),
    ('admin1', '$2a$10$r1l6NdFeGQ5S74cwQEWyFerXFs5pnJIifi/ARNCrdkUNNbrJA/c8y', 'admin@chiqko.pp.ua', 'Admin', 'User', '1975-08-10', 'Male', '789 Oak St, Village', '+1122334455', 'https://chiqko.pp.ua/api/v1/uploads/avatar.png', 'Admin'),
    ('moderator1', '$2a$10$.nYYEN6bBCQMEy3Zw5PGK.FHMp98lAYBJnGnQ00E94ZTFo1r6hkOy', 'moderator@chiqko.pp.ua', 'Moderator', 'User', '1995-03-25', 'Other', '567 Pine St, Town', '+9988776655', 'https://chiqko.pp.ua/api/v1/uploads/avatar.png', 'Moderator');


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    imageUrl VARCHAR(255),
    category VARCHAR(255),
    brand VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample product data
INSERT INTO products (name, description, price, imageUrl, category, brand) VALUES
    ('Product 1', 'This is product 1', 29.99, 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Clothing', 'Brand A'),
    ('Product 2', 'This is product 2', 39.99, 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Shoes', 'Brand B'),
    ('Product 3', 'This is product 3', 49.99, 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Accessories', 'Brand C');
