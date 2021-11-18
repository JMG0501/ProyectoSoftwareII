const db = require("../dao/models");

const pedidoAPI =
{
    post : async (req, res) =>
    {
        const pedido = req.body;

        const pedidoNuevo =
        {
            idCliente: 1,
            montoT: pedido.montoT,
        }

        const pedidoGuardado = await db.Pedido.create(pedidoNuevo);
        const objRes =
        {
            data : pedidoGuardado,
            msg : ""
        }
        res.json(objRes);
    }
}

module.exports = pedidoAPI;