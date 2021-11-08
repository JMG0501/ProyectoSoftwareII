'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    esAdmin: DataTypes.INTEGER,
    idTienda: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName: true
  });
  return Usuario;
};