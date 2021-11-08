'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido_Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pedido_Producto.init({
    idPedido: DataTypes.INTEGER,
    idProducto: DataTypes.INTEGER,
    idTienda: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    monto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido_Producto',
    freezeTableName: true
  });
  return Pedido_Producto;
};