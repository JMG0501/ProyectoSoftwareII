// Constante General
// const URL_BASE = "http://localhost:3000";
// Variables Carrito de Compra
var arregloProductosCC = [];
var filasTabla = 0;
var montoTotal = 0;
var pedidoPreliminar = [];

// Variable Conteo Botones
// var cantidadBotones = 0;
// Local Storage

var filtrarProductos = () =>
{ 
    var urlAEjecutar = `${URL_BASE}/producto`;

    var signoBool = false

    var categoriaB = document.getElementById("listaCategorias").selectedIndex;
    if (categoriaB != 0){
        if (signoBool == false)
        {
            urlAEjecutar += "?";
            signoBool = true; 
        }
        urlAEjecutar += `categoria=${categoriaB}`;
        //categoriaSeleccion = true
    };

    fetch(urlAEjecutar, 
    {
        method : "GET"
    }).then( (res) => {
        res.json().then((data)=> {
            if (data.msg == "") {
                document.getElementById('cardsProductos').innerHTML = "";
                for (var ev of data.data) {
                    armarCard(ev);
                }
            }
        })
    })
}

const butAgregarProductoOnClick = (e) => {
    var numID = e.target.getAttribute("idbutton");

    var idTienda = e.target.getAttribute("idTienda");
    var idProducto = e.target.getAttribute("idProducto");
    var producto = e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
    var cantidad = 1;
    var monto1 = e.target.previousSibling.previousSibling;
    var monto2 = monto1.firstElementChild.nextElementSibling.innerHTML;
    var stockProducto = parseInt(e.target.getAttribute("stock"));

    var boolFila = document.getElementById("filaProducto" + numID);
    var tbody = document.getElementById('tbody');

    if (boolFila == null) {

        montoTotal = parseInt(montoTotal) + parseInt(monto2);
        document.getElementById('subtotal').innerHTML = "Subtotal: S/. " + montoTotal + ".00";
        var tr = document.createElement('tr');
        tr.setAttribute("id", "filaProducto" + numID);
        tr.setAttribute("idTienda", idTienda);
        tr.setAttribute("idProducto", idProducto);
        var td1 = document.createElement('td');
        td1.setAttribute("id", "colProductoNom" + numID);
        td1.setAttribute("class", "align-middle");
        var td2 = document.createElement('td');
        td2.setAttribute("id", "colProductoCant" + numID);
        td2.setAttribute("class", "align-middle");
        var td3 = document.createElement('td');
        td3.setAttribute("id", "colProductoMonto" + numID);
        td3.setAttribute("class", "align-middle");
        var span = document.createElement('span');
        span.setAttribute("id", "productoCant" + numID)
        span.innerHTML = cantidad;
        var butD = document.createElement("button");
        butD.setAttribute("class", "btn text-white bgFirstColor btn-sm me-2")
        butD.setAttribute("id", "butD" + numID)
        butD.innerHTML = "-"
        butD.onclick = function()
        {
            var prodCantidad = document.getElementById("productoCant"+numID)
            var montoParcial = document.getElementById("colProductoMonto" + numID)
            var subtotal = document.getElementById('subtotal')
            if (parseInt(prodCantidad.innerHTML) > 1) 
            {
                prodCantidad.innerHTML = parseInt(prodCantidad.innerHTML) - 1;
                montoParcial.innerText = parseInt(monto2)*parseInt(prodCantidad.innerHTML);
                montoTotal = montoTotal-parseInt(monto2);
                subtotal.innerText = "Subtotal: S/. " + montoTotal + ".00";
            }
        }
        var butA = document.createElement("button");
        butA.setAttribute("class", "btn text-white bgFirstColor btn-sm ms-2")
        butA.setAttribute("id", "butA" + numID)
        butA.innerHTML = "+"
        butA.onclick = function()
        {
            var prodCantidad = document.getElementById("productoCant"+numID)
            var montoParcial = document.getElementById("colProductoMonto" + numID)
            var subtotal = document.getElementById('subtotal')
            if (parseInt(prodCantidad.innerHTML) < stockProducto) 
            {
                prodCantidad.innerHTML = parseInt(prodCantidad.innerHTML) + 1;
                montoParcial.innerText = parseInt(monto2)*parseInt(prodCantidad.innerHTML);
                montoTotal = montoTotal+parseInt(monto2);
                subtotal.innerText = "Subtotal: S/. " + montoTotal + ".00";
            }
        }

        td1.innerHTML = producto.innerHTML;
        td3.innerHTML = monto2;

        td2.appendChild(butD);
        td2.appendChild(span);
        td2.appendChild(butA);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
        arregloProductosCC.push(numID);

        filasTabla++;
        document.getElementById('cantProductos').innerHTML = "("+filasTabla+")";
    }
}

const asignarOnClickBotones = () =>
{
    const myElement = document.getElementById('cardsProductos');
    var element = myElement.firstElementChild;
    for (let i = 0; i < myElement.children.length; i++) 
    {
        var idButton = element.getAttribute("productoId");
        document.getElementById("idbutton"+idButton).onclick = butAgregarProductoOnClick;
        element = element.nextElementSibling;
    }
}

const generarPedidoPreliminar = () =>
{
    var idProducto, idTienda, cantidad, monto, nombreProducto
    var carritoCompras = document.getElementById("tbody");
    var elemento = carritoCompras.firstElementChild;
    localStorage.setItem("idTienda", elemento.getAttribute("idTienda"));

    for (let i = 0; i < carritoCompras.children.length; i++) 
    {
        var columna = elemento.firstElementChild;
        nombreProducto = columna.innerText;
        columna = columna.nextElementSibling;
        cantidad = columna.firstElementChild.nextSibling.innerText;
        columna = columna.nextElementSibling;
        monto = columna.innerText;
        idProducto = elemento.getAttribute("idProducto");
        idTienda = elemento.getAttribute("idTienda");

        pedidoPreliminar.push({
            nombre: nombreProducto,
            idTienda: idTienda,
            idProducto: idProducto,
            cantidad: cantidad,
            monto: monto
        })

        elemento = elemento.nextElementSibling;
    }

    localStorage.setItem("pedidoPreliminar", JSON.stringify(pedidoPreliminar));
    localStorage.setItem("subtotalPreliminar", montoTotal);
    location.href = "http://localhost:3000/checkout";
}

function main() 
{
    asignarOnClickBotones();
    document.getElementById('botonPagar').addEventListener('click', generarPedidoPreliminar);
}

window.addEventListener("load", main);