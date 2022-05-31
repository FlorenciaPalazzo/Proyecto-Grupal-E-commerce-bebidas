const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) { this.setDataValue('comentario', value.toLowerCase()); }
    },
    puntaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0, max:5 },
    }

  });
};