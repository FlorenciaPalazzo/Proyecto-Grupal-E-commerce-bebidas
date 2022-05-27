const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('favorito', {
    id: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,     
   },

    usuarioId: {
      type:DataTypes.STRING,
     
           
   },

   productoId: {
    type:DataTypes.STRING,
    
         
 },

  });
};