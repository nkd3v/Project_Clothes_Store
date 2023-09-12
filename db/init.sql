-- Create a sample user table
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255)
);

-- Insert some sample data
INSERT INTO Users (firstName, lastName) VALUES
  ('John', 'Doe'),
  ('Jane', 'Smith');
