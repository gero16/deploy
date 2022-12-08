const { DataTypes } = require("sequelize");
const sequelize = require("../db/db")

  
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING
    },
    correo: {
      type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    usuario: {
      type: DataTypes.STRING
    },
  },
  { 
    timestamps: false,
  })


  module.exports = {
    Usuario,
  }