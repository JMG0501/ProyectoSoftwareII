'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Usuario",
      [
        {
          correo: "user1@user.com",
          contraseña: "12345",
          nombre: "Piero",
          apellido: "Gallo",
          direccion: "Jr. Los Alamos 142",
          telefono: "987654321",
          esAdmin: "0",
          idTienda: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          correo: "user2@user.com",
          contraseña: "12345",
          nombre: "Valia",
          apellido: "Zavala",
          direccion: "Av. Las Frutas 4122",
          telefono: "987654321",
          esAdmin: "0",
          idTienda: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          correo: "user3@user.com",
          contraseña: "12345",
          nombre: "Renatto",
          apellido: "Pantoja",
          direccion: "Jr. Pandas 772",
          telefono: "987654321",
          esAdmin: "0",
          idTienda: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          correo: "admin@admin.com",
          contraseña: "12345",
          nombre: "Jorge",
          apellido: "Mandujano",
          direccion: "Jr. Huantar 176",
          telefono: "987654321",
          esAdmin: "1",
          idTienda: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Usuario", null);
  }
};
