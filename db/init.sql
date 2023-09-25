-- Create the user table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    dateOfBirth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    country VARCHAR(255),
    state VARCHAR(255),
    city VARCHAR(255),
    postalCode VARCHAR(10),
    phoneNumber VARCHAR(20),
    role ENUM('Customer', 'Merchant', 'Admin', 'Moderator'),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

<<<<<<< HEAD
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
=======
-- Create the product table
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
>>>>>>> 13655cc (optimize database and automatic update for frontend)
    brand VARCHAR(255),
    tag VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create a table to store product categories
CREATE TABLE Categories ( -- new value
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parentId INT,
    FOREIGN KEY (parentId) REFERENCES Categories(id)
);

-- Create a table to represent the many-to-many relationship between products and categories
CREATE TABLE ProductCategories (
    productId INT,
    categoryId INT,
    PRIMARY KEY (productId, categoryId),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (categoryId) REFERENCES Categories(id)
);

-- Create a table to store product tags
CREATE TABLE ProductTags ( -- new value
    productId INT NOT NULL,
    tag VARCHAR(255) NOT NULL,
    PRIMARY KEY (productId, tag),
    FOREIGN KEY (productId) REFERENCES Products(id)
);

-- Create the product variants table
CREATE TABLE ProductVariants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    size VARCHAR(20),
    color VARCHAR(50),
    quantity INT NOT NULL, -- new value
    variantPrice DECIMAL(10, 2) NOT NULL,
    variantImageUrl VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES Products(id)
);

-- Create the cart table
CREATE TABLE Carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Create the cart items table
CREATE TABLE CartItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cartId INT NOT NULL,
    productId INT NOT NULL,
    productVariantId INT NOT NULL,
    quantity INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cartId) REFERENCES Carts(id),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (productVariantId) REFERENCES ProductVariants(id)
);

-- Create the order table
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    orderStatus ENUM('Waiting for payment', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Create the order items table
CREATE TABLE OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    productVariantId INT NOT NULL,
    quantity INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES Orders(id),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (productVariantId) REFERENCES ProductVariants(id)
);

-- Create the payment table
CREATE TABLE Payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    orderId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paymentStatus ENUM('Pending', 'Completed', 'Failed') NOT NULL,
    paymentDate DATETIME NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (orderId) REFERENCES Orders(id)
);

-- Create the discount table
CREATE TABLE Discounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    discountAmount DECIMAL(10, 2) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    usageCount INT NOT NULL DEFAULT 0,
    usageLimit INT NOT NULL DEFAULT 1,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES Products(id)
);

-- Create the chat messages table
CREATE TABLE ChatMessages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES Users(id),
    FOREIGN KEY (receiverId) REFERENCES Users(id)
);


-- Insert sample user data
INSERT INTO Users (username, password, email, firstName, lastName, dateOfBirth, gender, address1, address2, phoneNumber, role) VALUES
    ('user1', '$2a$10$HZsA4OJcyMdXrVGmFmZfMuhJHz694QboKTfod1FdhbCzsXN8MwocS', 'user1@chiqko.pp.ua', 'John', 'Doe', '1990-01-15', 'Male', '123 Main St, City', '123 Main St, City', '+1234567890', 'Customer'),
    ('merchant1', '$2a$10$PkEIKZcl1L7iuS2ZBWuqoue26di3dH8suxQ7NR/1HUmZqxl41/5qe', 'merchant@chiqko.pp.ua', 'Merchant', 'User', '1985-05-20', 'Female', '456 Elm St, Town', '123 Main St, City', '+9876543210', 'Merchant'),
    ('admin1', '$2a$10$r1l6NdFeGQ5S74cwQEWyFerXFs5pnJIifi/ARNCrdkUNNbrJA/c8y', 'admin@chiqko.pp.ua', 'Admin', 'User', '1975-08-10', 'Male', '789 Oak St, Village', '123 Main St, City', '+1122334455', 'Admin'),
    ('moderator1', '$2a$10$.nYYEN6bBCQMEy3Zw5PGK.FHMp98lAYBJnGnQ00E94ZTFo1r6hkOy', 'moderator@chiqko.pp.ua', 'Moderator', 'User', '1995-03-25', 'Other', '567 Pine St, Town', '123 Main St, City', '+9988776655', 'Moderator');

-- Insert sample product data
<<<<<<< HEAD
INSERT INTO products (name, description, price,size_stock_avliable, imageUrl, category, brand,tag) VALUES
    ('Product 1', 'This is product 1', 29.99,'S:1 ,M:2 ,L:3 ,XL:4', 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Clothing', 'Brand A','sex:man, color:green'),
    ('Product 2', 'This is product 2', 39.99,'S:1 ,M:2 ,L:3 ,XL:4', 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Shoes', 'Brand B','sex:women, color:blue'),
    ('Product 3', 'This is product 3', 49.99,'S:1 ,M:2 ,L:3 ,XL:4', 'http://chiqko.pp.ua/api/v1/uploads/default.png', 'Accessories', 'Brand C','sex:boy, color:red');
=======
INSERT INTO Products (name, description, brand) VALUES
    ('Product 1', 'This is product 1', 'Brand A'),
    ('Product 2', 'This is product 2', 'Brand B'),
    ('Product 3', 'This is product 3', 'Brand C');
>>>>>>> 13655cc (optimize database and automatic update for frontend)
