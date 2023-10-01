const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', // Use the SQLite dialect
  storage: './db/db.sqlite',
  strict: true,
  define: {
    force: true,
  },
});

module.exports = sequelize;

require('../db/initDatabase');
