-- Create database if not exists
CREATE DATABASE IF NOT EXISTS engraced_transportation;
USE engraced_transportation;

-- Create initial tables (basic structure)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('PASSENGER', 'DRIVER', 'ADMIN', 'HR') DEFAULT 'PASSENGER',
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING') DEFAULT 'PENDING',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (firstName, lastName, email, password, role, status) 
VALUES ('Admin', 'User', 'admin@engraced.com', '$2b$10$rQZ8N3YqG8K9L2M1N0O9P8Q7R6S5T4U3V2W1X0Y9Z8A7B6C5D4E3F2G1H0I', 'ADMIN', 'ACTIVE')
ON DUPLICATE KEY UPDATE updatedAt = CURRENT_TIMESTAMP;
