
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'Komal@123',
  database: 'postgres',
  dialect: 'postgres',
});

module.exports = sequelize;


