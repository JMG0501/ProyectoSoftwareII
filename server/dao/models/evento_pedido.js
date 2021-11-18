'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento_Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Evento_Pedido.init({
    idPedido: DataTypes.INTEGER,
    idEvento: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    montoP: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Evento_Pedido',
    freezeTableName: true
  });
  return Evento_Pedido;
};