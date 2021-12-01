const db = require("../dao/models");

const PedidoProductoDAO =
{
    post : async (req, res) =>
    {
        const ProductoPedido = req.body;
        var salidaStock = ProductoPedido.cantidad;

        const PedidoProductoNuevo =
        {
            idPedido: ProductoPedido.idPedido,
            idProducto: ProductoPedido.idProducto,
            idTienda: ProductoPedido.idTienda,
            cantidad: ProductoPedido.cantidad,
            monto: ProductoPedido.monto
        }

        const lotesProductos = [];

        const lotesProductoDB = await db.Lote_Producto.findAll({
            where : 
            {
                idTienda : ProductoPedido.idTienda,
                idProducto : ProductoPedido.idProducto
            },
            order: [["fechaVencimiento","ASC"]]
        });

        for (let object of lotesProductoDB) 
        {
            lotesProductos.push({
                idLote: object.idLote,
                stockDisponible: object.stockDisponible,
                stockVendido: object.stockVendido,
                estado: object.estado
            })
        }

        for (let index = 0; index < lotesProductos.length; index++) 
        {
            if (salidaStock != 0) 
            {
                if (lotesProductos[index].estado == "Lote Vigente") 
                {
                    if (salidaStock >= lotesProductos[index].stockDisponible) 
                    {
                        salidaStock = salidaStock - parseInt(lotesProductos[index].stockDisponible)

                        const actulizacionStockD = await db.Lote_Producto.update(
                            {
                                stockDisponible: 0,
                                stockVendido: parseInt(lotesProductos[index].stockDisponible),
                                updateAt: new Date()
                            },
                            {
                                where:
                                {
                                    idTienda: ProductoPedido.idTienda,
                                    idProducto: ProductoPedido.idProducto,
                                    idLote: lotesProductos[index].idLote
                                }
                            }
                        )
                    }
                    else
                    {
                        const nuevoStockDisponbile =  parseInt(lotesProductos[index].stockDisponible) - salidaStock

                        const actulizacionStockD = await db.Lote_Producto.update(
                            {
                                stockDisponible: nuevoStockDisponbile,
                                stockVendido: parseInt(lotesProductos[index].stockVendido) + parseInt(salidaStock),
                                updateAt: new Date()
                            },
                            {
                                where:
                                {
                                    idTienda : ProductoPedido.idTienda,
                                    idProducto : ProductoPedido.idProducto,
                                    idLote : lotesProductos[index].idLote
                                }
                            }
                        )
                        salidaStock = 0;
                    }
                } 
            }
            else
            {
                break;
            }  
        }

        console.log(lotesProductoDB);

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