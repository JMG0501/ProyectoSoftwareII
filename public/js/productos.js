// Constante General
// const URL_BASE = "http://localhost:3000";
// Variables Carrito de Compra
var arregloProductosCC = [];
var filasTabla = 0;
var montoTotal = 0;

// Variable Conteo Botones
// var cantidadBotones = 0;
// Local Storage
// localStorage.setItem("idUsuario", 1);

const butAgregarProductoOnClick = (e) => {
    var numID = e.target.getAttribute("idbutton");

    var producto = e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
    var cantidad = 1;
    var monto1 = e.target.previousSibling.previousSibling;
    var monto2 = monto1.firstElementChild.nextElementSibling.innerHTML;

    var boolFila = document.getElementById("filaProducto" + numID);
    var tbody = document.getElementById('tbody');

    if (boolFila == null) {

        var tr = document.createElement('tr');
        tr.setAttribute("id", "filaProducto" + numID);
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


function main() 
{
    asignarOnClickBotones();
}

window.addEventListener("load", main);