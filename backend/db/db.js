require('dotenv').config()
const { Sequelize, Model, DataTypes } = require("sequelize");

console.log(process.env.DB_NAME)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect:  'postgres', 
});

 

  module.exports = sequelize