-- Create the user table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample user data
INSERT INTO users (username, password) VALUES
    ('user1', '$2a$10$rGLt3GXyUkOydMQ2LSRU0umfm4Atarh6sfCGKzUpYdr.vjbd9Ds3.'), -- Password: user1
    ('user2', '$2a$10$JjXhPYerX9sj3dPr7rlkfOB9jH3SkCQOoKGnynxQ.zpOlsQHx99/m'), -- Password: user2
    ('user3', '$2a$10$8lMNM.8lEwxDaXynljZKe.O1y5ZCwZVJHaCkihk8s5cyFPRTbZTH.'); -- Password: user3
