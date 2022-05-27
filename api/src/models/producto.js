const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("producto", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    marca: {
      type: DataTypes.STRING,
    },

    descripcion: {
      type: DataTypes.TEXT,
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
    },
<<<<<<< HEAD
    descripcion: {
      type: DataTypes.TEXT,
    },
    tipo: {
      type: DataTypes.TEXT,
    },
=======
    
    tipo:{
      type: DataTypes.TEXT,
    },
    

>>>>>>> 346316789e846601d3315885e3f60b3132790069
  });
};
