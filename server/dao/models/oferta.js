'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oferta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Oferta.init({
    url: DataTypes.STRING,
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Oferta',
    freezeTableName: true
  });
  return Oferta;
};