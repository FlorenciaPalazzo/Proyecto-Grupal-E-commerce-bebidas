const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('cliente', {
    id: {
      type: DataTypes.FLOAT,
      primaryKey: true,     
   },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.FLOAT,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: "false"
  },
  });
};