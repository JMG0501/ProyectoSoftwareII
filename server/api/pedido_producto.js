const db = require("../dao/models");

const PedidoProductoDAO =
{
    post : async (req, res) =>
    {
        const ProductoPedido = req.body;

        const PedidoProductoNuevo =
        {
            idPedido: ProductoPedido.idPedido,
            idProducto: ProductoPedido.idProducto,
            idTienda: ProductoPedido.idTienda,
            cantidad: ProductoPedido.cantidad,
            monto: ProductoPedido.monto
        }

        const ProductoPedidoGuardado = await db.Pedido_Producto.create(PedidoProductoNuevo);
        const objRes =
        {
            data : ProductoPedidoGuardado,
            msg : "Registrado Exitosamente"
        }
        res.json(objRes);
    }
}

module.exports = PedidoProductoDAO;