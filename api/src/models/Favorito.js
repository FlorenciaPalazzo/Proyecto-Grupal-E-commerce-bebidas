<<<<<<< HEAD
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('favorito', {
    fav_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
primaryKey: true,
        },

    });
=======
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('favorito', {
    fav_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
primaryKey: true,
        },

    });
>>>>>>> 5dff3251f826a8a940716abf8b6d7df8f8301971
};