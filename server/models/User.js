const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
  },
  firstName: {
    type: DataTypes.STRING(255),
  },
  lastName: {
    type: DataTypes.STRING(255),
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.ENUM('ชาย', 'หญิง'),
  },
  address1: {
    type: DataTypes.STRING(255),
  },
  address2: {
    type: DataTypes.STRING(255),
  },
  country: {
    type: DataTypes.STRING(255),
  },
  state: {
    type: DataTypes.STRING(255),
  },
  city: {
    type: DataTypes.STRING(255),
  },
  postalCode: {
    type: DataTypes.STRING(10),
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
  },
  role: {
    type: DataTypes.ENUM('ซื้อ', 'ขาย'),
  },
});

module.exports = User;
