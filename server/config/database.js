const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', // Use the SQLite dialect
  storage: 'database.sqlite', // Path to your SQLite database file
});

module.exports = sequelize;
