'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lote_Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lote_Producto.init({
    idTienda: DataTypes.INTEGER,
    idProducto: DataTypes.INTEGER,
    idLote: DataTypes.INTEGER,
    proveedor: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    fechaVencimiento: DataTypes.DATE,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lote_Producto',
    freezeTableName: true
  });
  return Lote_Producto;
};