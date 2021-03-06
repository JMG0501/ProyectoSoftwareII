'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Producto_Tienda",
      [
        {
          idTienda: 1,
          idProducto: 1,
          nombre: "Tomate Italiano",
          imagen: "https://images.rappi.pe/products/40425-1541955284.png?d=200x200&?d=1920xundefined&e=webp",
          descripcion: "250 g",
          precio: 3,
          categoria: "Frutas y Verduras",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 1,
          idProducto: 2,
          nombre: "Don Vittorio Salsa Roja",
          imagen: "https://images.rappi.pe/products/97625-1560872039168.png?d=200x200&?d=1920xundefined&e=webp",
          descripcion: "400 g",
          precio: 4,
          categoria: "Abarrotes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 1,
          idProducto: 3,
          nombre: "Costeño Arroz Extra",
          imagen: "https://images.rappi.pe/products/97539-1605570792796.png?d=200x200&?d=1200xundefined&e=webp",
          descripcion: "5 Kg",
          precio: 20,
          categoria: "Abarrotes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 2,
          idProducto: 1,
          nombre: "Field Galleta Coronita Chocolate",
          imagen: "https://images.rappi.pe/products/97781-1592255736286.png?d=200x200&?d=1920xundefined&e=webp",
          descripcion: "228 g",
          precio: 3,
          categoria: "Galletas",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 2,
          idProducto: 2,
          nombre: "San Mateo Bidón Sin Gas",
          imagen: "https://images.rappi.pe/products/390940-1613059457429.jpg?d=200x200&?d=3840xundefined&e=webp",
          descripcion: "7 L",
          precio: 8,
          categoria: "Aguas y Bebidas",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          idTienda: 2,
          idProducto: 3,
          nombre: "Palta Fuerte",
          imagen: "https://images.rappi.pe/products/35794-1540931960.png?d=200x200&?d=3840xundefined&e=webp",
          descripcion: "250 g",
          precio: 10,
          categoria: "Frutas y Verduras",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Producto_Tienda", null);
  }
};
