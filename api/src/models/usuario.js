const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('usuario', {
    id: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,     
   },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // apellido: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    // contraseña: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    nacimiento: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: "false"
  },
  });
};