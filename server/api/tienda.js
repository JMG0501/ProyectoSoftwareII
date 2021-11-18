const db = require("../dao/models");

const TiendaDAO =
{
    getAll : async () =>
    {
        const arregloTienda = await db.Tienda.findAll();
        return arregloTienda
    }
}

module.exports = TiendaDAO;