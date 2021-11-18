const db = require("../dao/models");

const tipoAPI =
{
    getAll : async (req, res) =>
    {
        const arregloTipo = await db.Tipo.findAll();
        res.json(
        {
            data : arregloTipo,
            msg : ""
        })
    }
}

module.exports = tipoAPI;