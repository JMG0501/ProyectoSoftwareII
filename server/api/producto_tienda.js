const db = require("../dao/models");

const ProductoTiendaDAO =
{
    getProductoTienda : async (productoTiendaId) =>
    {
        const arregloProductoTienda = await db.Producto_Tienda.findAll({
            where : {idTienda : productoTiendaId},
            order: [["idProducto","ASC"]]
        });
        return arregloProductoTienda;
    },

    put : async (req, res) =>
    {
        const nuevosDatos = req.body;
        const productoID = nuevosDatos.idProducto;
        const tiendaID = nuevosDatos.idTienda;

        const registro = await db.Producto_Tienda.update(
            {
                idTienda: nuevosDatos.idTienda,
                idProducto: nuevosDatos.idProducto,
                nombre: nuevosDatos.nombre,
                imagen: nuevosDatos.imagen,
                descripcion: nuevosDatos.descripcion,
                precio: nuevosDatos.precio,
                updateAt: new Date()
            },
            {
                where:
                {
                    idTienda : tiendaID,
                    idProducto : productoID
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
                msg: "No se encontró el producto con el id enviado"
            }
            res.status(400).json(objError);
        }
    },

    delete : async (req, res) => 
    {
        const idProductoE = req.params.idProducto;
        const idTiendaE = req.params.idTienda;

        await db.Producto_Tienda.destroy(
        {
           where : 
           {
               idTienda : idTiendaE,
               idProducto: idProductoE
           } 
        });

        res.json({msg : ""});
    },

    post : async (req, res) => 
    {
        const nuevoProducto = req.body;

        const productoNuevo = 
        {
            idTienda: nuevoProducto.idTienda,
            idProducto: 100,
            nombre: nuevoProducto.nombre,
            imagen: nuevoProducto.imagen,
            descripcion: nuevoProducto.descripcion,
            precio: nuevoProducto.precio,
            createdAt : new Date(),
            updatedAt : new Date()
        }

        const productoGuardado = await db.Producto_Tienda.create(productoNuevo);
        const objRes = 
        {
            data : productoGuardado,
            msg : ""
        }
        res.json(objRes);
    }
}

module.exports = ProductoTiendaDAO;