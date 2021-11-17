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
            total: pedido.total,
            estado: "Pendiente"
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

    put : async (req, res) =>
    {
        const nuevosDatos = req.body;
        const pedidoID = nuevosDatos.id;
        const tiendaID = nuevosDatos.idTienda;

        const registro = await db.Pedido_Usuario.update(
            {
                estado: nuevosDatos.estado,
                updateAt: new Date()
            },
            {
                where:
                {
                    id : pedidoID,
                    idTienda : tiendaID
                }
            }
        );

        if (registro != null) 
        {
            const objRes = 
            {
                data: registro,
                msg : ""
            }
            res.json(objRes);
            return;
        }
        else
        {
            const objError =
            {
                msg: "No se encontró el pedido con los parametros enviados"
            }
            res.status(400).json(objError);
        }
    }
}

module.exports = PedidoUsuarioDAO;