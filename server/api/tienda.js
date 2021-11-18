const db = require("../dao/models");

const TiendaDAO =
{
    getAll : async () =>
    {
        const arregloTienda = await db.Tienda.findAll();
        return arregloTienda
    },
    post: async (req, res) => {
        if (req.body.nombreTienda === undefined) {
            const objError =
            {
                msg: "Debe ingresar todos los campos"
            }
            res.status(400).json(objError);
            return;
        }

        const cuentaId = await db.Tienda.count();
        const nuevaTienda = {
            id: cuentaId + 1,
            nombreTienda: req.body.nombreTienda
        }

        const objTienda = await db.Tienda.create(nuevaTienda);

        const objRes = {
            data: objTienda,
            msg: ""
        }
        res.json(objRes);
    }
}

module.exports = TiendaDAO;