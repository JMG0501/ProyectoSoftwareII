'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tienda",
      [
        {
          nombreTienda: "Tienda Las Nubes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombreTienda: "Tienda Los Tulipanes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombreTienda: "Tienda Las Gardenias",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tienda", null);
  }
};
