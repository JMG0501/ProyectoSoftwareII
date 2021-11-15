const db = require("../dao/models");

const PedidoUsuarioDAO =
{
    post : async (req, res) =>
    {
        const pedido = req.body;

        const pedidoNuevo =
        {
            idUsuario: pedido.idUsuario,
            idTienda: pedido.idTienda,
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
    },

    getPedidoTienda : async (pedidoTiendaId) =>
    {
        const arregloPedidoTienda = await db.Pedido_Usuario.findAll({
            where : {idTienda : pedidoTiendaId},
            order: [["id","ASC"]]
        });
        return arregloPedidoTienda;
    },

    getPedidoUsuario : async (pedidoUsuarioId) =>
    {
        const arregloPedidoTienda = await db.Pedido_Usuario.findAll({
            where : {idUsuario : pedidoUsuarioId},
            order: [["id","ASC"]]
        });
        return arregloPedidoTienda;
    },
}

module.exports = PedidoUsuarioDAO;