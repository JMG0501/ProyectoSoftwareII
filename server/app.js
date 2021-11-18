const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const path = require('path');

const TiendaDAO = require("./api/tienda");
const ProductoTiendaDAO = require("./api/producto_tienda");

app.set('views', path.join("public", 'views'));
app.set('view engine', 'ejs');

app.use(express.static("assets"));
app.use(express.static("assets/demo"));
app.use(express.static("assets/img"));
app.use(express.static("public"));
app.use(express.static("public/views"));
app.use(express.static("public/js"));
app.use(express.static("public/views/pages"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// 1. Pagina Principal
app.get('/pagina_principal', function(req, res) {
    // Render del archivo pagina_principal.ejs [public\views\pages\pagina_principal.ejs]
    res.render('pages/pagina_principal');
});

// 2. Tiendas
app.get('/tiendas', async function(req, res) {
    // Creación de const[arreglo] que obtiene los registros de la tabla 'Tienda' de la BD
    const listaTiendas = await TiendaDAO.getAll()

    // Render del archivo tiendas.ejs [public\views\pages\tiendas.ejs]
    res.render('pages/tiendas', {
        // Se envía como variable 'tiendas' que contiene el arreglo listaTienda previamente creado
        tiendas: listaTiendas
    });
});

// 3. Productos
app.get('/:id/productos', async function(req, res) {
    // Creación de const[int] que obtiene el idTienda enviado dentro de la ruta '/productos/:id'
    const productoTiendaId = req.params.id;
    // Creación de const[arreglo] que obtiene los registros de la tabla 'Producto_Tienda' de la BD
    // donde su idTienda coincida con el idTienda obtenido en 'productoTiendaId'
    const listaProductoTiendaDB = await ProductoTiendaDAO.getProductoTienda(parseInt(productoTiendaId));
    // Creación de const[arreglos]
    const listaProductoTienda = [];

    // Iteración de los elementos de listaProductoTiendaDB
    for (let object of listaProductoTiendaDB)
    {
        listaProductoTienda.push({
            id : object.id,
            idTienda: object.idTienda,
            idProducto: object.idProducto,
            nombre: object.nombre,
            imagen: object.imagen,
            descripcion: object.descripcion,
            precio: object.precio
        })
    }

    console.log(listaProductoTienda);

    res.render('pages/productos', {
        productoTienda: listaProductoTienda,
    });
});

// 4. Panel de Control Administrador
app.get('/admin_index/:id', async function(req, res) {
    const productoTiendaId = req.params.id;
    const listaProductoTiendaDB = await ProductoTiendaDAO.getProductoTienda(parseInt(productoTiendaId));
    const listaProductoTienda = [];
    for (let object of listaProductoTiendaDB)
    {
        listaProductoTienda.push({
            id : object.id,
            idTienda: object.idTienda,
            idProducto: object.idProducto,
            nombre: object.nombre,
            imagen: object.imagen,
            descripcion: object.descripcion,
            precio: object.precio
        })
    }

    res.render('pages/admin_index', {
        productoTienda: listaProductoTienda,
    });
});

// 5. Actualización de Productos
app.put("/producto_tienda", ProductoTiendaDAO.put);

// 5. Eliminación de Productos
app.delete("/producto_tienda/:idProducto/:idTienda", ProductoTiendaDAO.delete);

// Depuración en consola
app.listen(PORT, () =>
{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})