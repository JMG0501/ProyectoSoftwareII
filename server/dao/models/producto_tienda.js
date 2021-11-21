'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto_Tienda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Producto_Tienda.init({
    idTienda: DataTypes.INTEGER,
    idProducto: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    imagen: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto_Tienda',
    freezeTableName: true
  });
  return Producto_Tienda;
};