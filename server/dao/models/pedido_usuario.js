'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido_Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pedido_Usuario.init({
    idUsuario: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    costoEnvio: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido_Usuario',
    freezeTableName: true
  });
  return Pedido_Usuario;
};