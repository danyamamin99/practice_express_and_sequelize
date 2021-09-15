const {Sequelize} = require('sequelize');

module.exports = new Sequelize('list_users', 'postgres', 'root', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
})