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

const butAgregarProductoOnClick = (e) => {
    var numID = e.target.getAttribute("idbutton");

    var idTienda = e.target.getAttribute("idTienda");
    var idProducto = e.target.getAttribute("idProducto");
    var producto = e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
    var cantidad = 1;
    var monto1 = e.target.previousSibling.previousSibling;
    var monto2 = monto1.firstElementChild.nextElementSibling.innerHTML;

    var boolFila = document.getElementById("filaProducto" + numID);
    var tbody = document.getElementById('tbody');

    if (boolFila == null) {

        var tr = document.createElement('tr');
        tr.setAttribute("id", "filaProducto" + numID);
        tr.setAttribute("idTienda", idTienda);
        tr.setAttribute("idProducto", idProducto);
        var td1 = document.createElement('td');
        td1.setAttribute("id", "colProductoNom" + numID);
        var td2 = document.createElement('td');
        td2.setAttribute("id", "colProductoCant" + numID);
        var td3 = document.createElement('td');
        td3.setAttribute("id", "colProductoMonto" + numID);

        td1.innerHTML = producto.innerHTML;
        td2.innerHTML = cantidad;
        td3.innerHTML = monto2;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
        arregloProductosCC.push(numID);
    }
    else 
    {
        var tempCant = parseInt(document.getElementById("colProductoCant" + numID).innerText);
        tempCant++;
        document.getElementById("colProductoCant" + numID).innerText = tempCant;

        var tempMonto = (monto2) * tempCant;
        document.getElementById("colProductoMonto" + numID).innerText = tempMonto;
    }

    
    filasTabla++;
    document.getElementById('cantProductos').innerHTML = "("+filasTabla+")";

    montoTotal = parseInt(montoTotal) + parseInt(monto2);
    document.getElementById('subtotal').innerHTML = "Subtotal: S/. " + montoTotal;
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
        cantidad = columna.innerText;
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