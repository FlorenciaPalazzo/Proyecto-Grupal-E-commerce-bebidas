const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('direcciones', {
        // usuarioId: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
           
        // },
        id_direcciones: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        delivery_type: {
            type: DataTypes.STRING,
        },
        calle_numero: {
            type: DataTypes.STRING
        },
        localidad: {
            type: DataTypes.STRING
        },
        codigo_postal: {
            type: DataTypes.INTEGER
        },
        provincia: {
            type: DataTypes.STRING
        }
    });
};