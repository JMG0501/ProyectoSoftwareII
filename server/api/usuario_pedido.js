const db = require("../dao/models");

const PedidoUsuarioDAO =
{
    post : async (req, res) =>
    {
        const pedido = req.body;

        const pedidoNuevo =
        {
            idUsuario: pedido.idUsuario,
            subtotal: pedido.subtotal,
            costoEnvio: pedido.costoEnvio,
            total: pedido.total
        }

        const pedidoGuardado = await db.Pedido_Usuario.create(pedidoNuevo);
        const objRes =
        {
            data : pedidoGuardado,
            msg : ""
        }
        res.json(objRes);
    }
}

module.exports = PedidoUsuarioDAO;