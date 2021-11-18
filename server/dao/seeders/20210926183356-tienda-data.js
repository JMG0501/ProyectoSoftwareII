'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tienda",
      [
        {
          id: 1,
          nombreTienda: "Tienda Las Nubes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          nombreTienda: "Tienda Los Tulipanes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
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
