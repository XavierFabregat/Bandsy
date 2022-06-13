const Sequelize = require('sequelize');
require('dotenv').config('../.env');

const password = process.env.postgresPWD;

const sequelize = new Sequelize('JamMateDB', 'postgres', password, {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

module.exports = sequelize;
