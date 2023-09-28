const sequelize = require('../config/database');
const User = require('../models/User');

// Function to create sample users
async function createSampleUsers() {
    try {
        const user1 = await User.create({
            username: 'user1',
            password: '$2a$10$Q8D.avI8SzfhOBcPTAAY9.l6HRYEm0Vo9lJ4gK.sJDlxb/vwwps/6',
            email: 'user1@example.com',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: new Date('1990-01-15'),
            gender: 'Male',
            address1: '123 Main St',
            city: 'City 1',
            state: 'State 1',
            country: 'Country 1',
            postalCode: '12345',
            phoneNumber: '123-456-7890',
            role: 'Customer',
        });

        const user2 = await User.create({
            username: 'user2',
            password: '$2a$10$UAJ7A4lgOdI4cvFyXTNV0evhpUHHZtnT4s2MrYL6JJp0aKaDbipMa',
            email: 'user2@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
            dateOfBirth: new Date('1985-03-20'),
            gender: 'Female',
            address1: '456 Elm St',
            city: 'City 2',
            state: 'State 2',
            country: 'Country 2',
            postalCode: '67890',
            phoneNumber: '987-654-3210',
            role: 'Merchant',
        });

        console.log('Sample users created successfully!');
    } catch (error) {
        console.error('Error creating sample users:', error);
    }
}

module.exports = createSampleUsers;