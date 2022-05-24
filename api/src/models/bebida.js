const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('bebida', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,     
   },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    marca: {
      type: DataTypes.STRING,
    },
    ml: {
      type: DataTypes.FLOAT,
    },
    graduacion: {
      type: DataTypes.FLOAT,
    },
    precio: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.FLOAT,
    }


  });
};
