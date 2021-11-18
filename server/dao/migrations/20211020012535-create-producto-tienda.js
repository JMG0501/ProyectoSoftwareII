'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Producto_Tienda', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      idTienda: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idProducto: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint("Producto_Tienda",
      {
        fields: ['idTienda'],
        type: 'FOREIGN KEY',
        name: 'FK_idTienda',
        references:
        {
          table: 'Tienda',
          field: 'id'
        }
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Producto_Tienda');
  }
};