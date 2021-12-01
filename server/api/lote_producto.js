const db = require("../dao/models");

const LoteProductoDAO =
{
    getLoteProductoTienda : async (productoId, tiendaId) =>
    {
        const arregloLoteProductoTienda = await db.Lote_Producto.findAll({
            where : 
            {
                idTienda : tiendaId,
                idProducto : productoId
            },
            order: [["idLote","ASC"]]
        });
        return arregloLoteProductoTienda;
    },

    actualizarEstadoLote : async (productoId, tiendaId, loteId) =>
    {
        const actualizarEstado = await db.Lote_Producto.update(
            {
                estado: "Lote Vencido"
            },
            {
                where : 
                {
                    idTienda : tiendaId,
                    idProducto : productoId,
                    idLote : loteId
                },
            }
        );
        return actualizarEstado;
    },

    getAll : async (tiendaId) =>
    {
        const arregloLoteProductoTienda = await db.Lote_Producto.findAll({
            where : 
            {
                idTienda : tiendaId
            },
            order: [["idProducto","ASC"]]
        });
        return arregloLoteProductoTienda;
    },

    post : async (req, res) =>
    {
        const nuevoLote = req.body;
        var nuevoId;

        const arregloLoteProductoTienda = await db.Lote_Producto.findAll({
            where : 
            {
                idTienda : nuevoLote.idTienda,
                idProducto : nuevoLote.idProducto
            },
            order: [["idLote","DESC"]]
        });

        if (arregloLoteProductoTienda.length == 0)
        {
            nuevoId = 1;
        }
        else
        {
            const ultimoIdActual = parseInt(arregloLoteProductoTienda[0].idLote)
            nuevoId = ultimoIdActual + 1;
        }

        const loteNuevo =
        {
            idTienda: nuevoLote.idTienda,
            idProducto: nuevoLote.idProducto,
            idLote: nuevoId,
            proveedor: nuevoLote.proveedor,
            stockRegistrado: nuevoLote.cantidad,
            stockDisponible: nuevoLote.cantidad,
            stockVendido: 0,
            fechaVencimiento: nuevoLote.fechaVencimiento,
            estado: nuevoLote.estado,
            createdAt: new Date(),
            updatedAt : new Date(),
        }

        const loteGuardado = await db.Lote_Producto.create(loteNuevo);
        const objRes = 
        {
            data : loteGuardado,
            msg : ""
        }
        res.json(objRes);
    }
}

module.exports = LoteProductoDAO;