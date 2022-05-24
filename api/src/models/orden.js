const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orden', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,     
   },
   fecha: {
       type: DataTypes.DATE
   },
   estado:{
    type: DataTypes.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
   },
   direccion:{
       type: DataTypes.STRING,
   },
   cantidad: {
       type: DataTypes.FLOAT
   }

  });
};