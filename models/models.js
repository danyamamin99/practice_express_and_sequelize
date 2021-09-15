const sequelize = require('../db/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  active: { type: DataTypes.ENUM, values: ['active', 'no_active'], defaultValue: 'active'}
});

module.exports = User;