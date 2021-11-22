'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Lote_Producto",
      [
        {
          idTienda: 2,
          idProducto: 1,
          idLote: 1,
          proveedor: "Proveedor Field Lima Norte",
          stockRegistrado: 10,
          stockDisponible: 10,
          stockVendido: 0,
          fechaVencimiento: new Date("December 15, 2021 00:00:01"),
          estado: "Lote Vigente",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 2,
          idProducto: 1,
          idLote: 2,
          proveedor: "Proveedor Field Lima Norte",
          stockRegistrado: 10,
          stockDisponible: 10,
          stockVendido: 0,
          fechaVencimiento: new Date("December 25, 2021 00:00:01"),
          estado: "Lote Vigente",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 2,
          idProducto: 1,
          idLote: 3,
          proveedor: "Proveedor Field Lima Norte",
          stockRegistrado: 10,
          stockDisponible: 10,
          stockVendido: 0,
          fechaVencimiento: new Date("November 10, 2021 00:00:01"),
          estado: "Lote Vigente",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 2,
          idProducto: 2,
          idLote: 1,
          proveedor: "Proveedor Backus Lima Centro",
          stockRegistrado: 10,
          stockDisponible: 10,
          stockVendido: 0,
          fechaVencimiento: new Date("December 25, 2021 00:00:01"),
          estado: "Lote Vigente",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 2,
          idProducto: 3,
          idLote: 1,
          proveedor: "Proveedor Agroindustria",
          stockRegistrado: 10,
          stockDisponible: 10,
          stockVendido: 0,
          fechaVencimiento: new Date("December 25, 2021 00:00:01"),
          estado: "Lote Vigente",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Lote_Producto", null);
  }
};
