const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const path = require('path');

const TiendaDAO = require("./api/tienda");
const ProductoTiendaDAO = require("./api/producto_tienda");
const PedidoUsuarioDAO = require("./api/usuario_pedido");
const PedidoProductoDAO = require("./api/pedido_producto");
const registro = require("./api/registro");
const login = require("./api/login");

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

// Pagina Principal
app.get('/pagina_principal', function(req, res) {
    // Render del archivo pagina_principal.ejs [public\views\pages\pagina_principal.ejs]
    res.render('pages/pagina_principal');
});

// Tiendas
app.get('/tiendas', async function(req, res) {
    // Creación de const[arreglo] que obtiene los registros de la tabla 'Tienda' de la BD
    const listaTiendas = await TiendaDAO.getAll()

    // Render del archivo tiendas.ejs [public\views\pages\tiendas.ejs]
    res.render('pages/tiendas', {
        // Se envía como variable 'tiendas' que contiene el arreglo listaTienda previamente creado
        tiendas: listaTiendas
    });
});

app.post('/tiendas', (req,res)=>{
    TiendaDAO.post(req,res);
});

// Productos
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

    res.render('pages/productos', {
        productoTienda: listaProductoTienda,
    });
});

// Panel de Control Administrador - Productos - Index
app.get('/:id/admin_index', async function(req, res) {
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

// Panel de Control Administrador - Pedidos
app.get('/:id/admin_pedidos', async function(req, res) {
    const pedidoTiendaId = req.params.id;
    const listaPedidoTiendaDB = await PedidoUsuarioDAO.getPedidoTienda(parseInt(pedidoTiendaId));
    const listaPedidoTienda = [];
    for (let object of listaPedidoTiendaDB)
    {
        listaPedidoTienda.push({
            idPedido: object.id,
            idCliente: object.idUsuario,
            fecha: object.createdAt,
            monto: object.total,
            estado: object.estado
        })
    }

    res.render('pages/admin_pedidos', {
        pedidoTienda: listaPedidoTienda,
    });
});

// Actualización de Productos
app.put("/producto_tienda", ProductoTiendaDAO.put);

// Agregación de Productos
app.post("/producto_tienda", ProductoTiendaDAO.post);

// Eliminación de Productos
app.delete("/producto_tienda/:idProducto/:idTienda", ProductoTiendaDAO.delete);

// Login
app.get("/login", (req,res)=>{
    res.render('pages/login');
})
app.post("/login",(req,res)=>{
    login.get(req,res);
})

// Registro
app.get("/register",(req,res)=>{
    res.render('pages/register');
});

app.post("/register", (req,res)=>{
    registro.post(req,res);
});

// Checkout
app.get('/checkout', function(req, res) {
    res.render('pages/checkout');
});

// Pedido-Usuario - Generación de Pedido
app.post("/usuario_pedido", PedidoUsuarioDAO.post);

// Pedido-Usuario - Actualizar Estado
app.put("/usuario_pedido", PedidoUsuarioDAO.put);

// Pedido-Producto
app.post("/pedido_producto", PedidoProductoDAO.post);

// Panel de Control Usuario - Pedidos
app.get('/:id/user_pedidos', async function(req, res) {
    const pedidoUsuarioId = req.params.id;
    const listaPedidoUsuarioDB = await PedidoUsuarioDAO.getPedidoUsuario(parseInt(pedidoUsuarioId));
    const listaPedidoUsuario = [];
    for (let object of listaPedidoUsuarioDB)
    {
        listaPedidoUsuario.push({
            idPedido: object.id,
            idTienda: object.idTienda,
            fecha: object.createdAt,
            monto: object.total,
            estado: object.estado
        })
    }

    res.render('pages/user_pedidos', {
        pedidoUsuario: listaPedidoUsuario,
    });
});

// Depuración en consola
app.listen(PORT, () =>
{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})