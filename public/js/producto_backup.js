// Constante General
const URL_BASE = "http://localhost:3000";
// Variables Carrito de Compra
var arregloProductosCC = [];
var filasTabla = 0;
var montoTotal = 0;
// Local Storage
localStorage.setItem("idUsuario", 1);

const armarCardProducto = (producto) =>{
    const divCards = document.getElementById('cardsProductos');

    var divCard = document.createElement('div');
    divCard.setAttribute('class', 'card mb-3');
    divCard.setAttribute('id', 'evento' + producto.id);

    var divEstructuraCard = document.createElement('div');
    divEstructuraCard.setAttribute('class', 'row card-body align-items-center');

    var divColumnaImagen = document.createElement('div');
    divColumnaImagen.setAttribute('class', 'col-md-3');
    var imagenProducto = document.createElement('img');
    imagenProducto.setAttribute('class', 'img-fluid rounded mx-auto d-block');
    imagenProducto.setAttribute('src', producto.imagen);
    imagenProducto.setAttribute('alt', 'Market')

    var divColumnaDescripcion = document.createElement('div');
    divColumnaDescripcion.setAttribute('class', 'col-md-9');
    var divCardBody = document.createElement("div");
    divCardBody.setAttribute('class', 'card-body');
    // Titulo del Card
    var h5Titulo = document.createElement('h5');
    h5Titulo.setAttribute('class', 'card-title');
    h5Titulo.innerHTML = producto.nombreProd;
    // Texto Secundario del Card
    var pText2 = document.createElement('p');
    pText2.setAttribute('class', 'card-text');
    var smallText1 = document.createElement('small');
    smallText1.innerHTML = producto.descripcion 
    smallText1.setAttribute('class', 'text-muted')
    // Texto Primario del Card
    var pText1 = document.createElement('p');
    pText1.setAttribute('class', 'card-text');
    var span1 = document.createElement('span');
    span1.innerHTML = "S/. "
    var span2 = document.createElement('span');
    span2.innerHTML = producto.precio;
    var span3 = document.createElement('span');
    span3.innerHTML = ".00 /u"
    // Boton de Card
    var buttonProducto = document.createElement('button');
    buttonProducto.setAttribute('class', 'btn btn-success');
    buttonProducto.innerHTML = "+";
    buttonProducto.setAttribute("idBoton", producto.id);
    buttonProducto.onclick = butAgregarProductoOnClick;

    divColumnaImagen.appendChild(imagenProducto);
    divCardBody.appendChild(h5Titulo);
    pText2.appendChild(smallText1);
    divCardBody.appendChild(pText2);
    pText1.append(span1);
    pText1.append(span2);
    pText1.append(span3);
    divCardBody.appendChild(pText1);
    divCardBody.appendChild(buttonProducto);
    divColumnaDescripcion.appendChild(divCardBody);
    divEstructuraCard.appendChild(divColumnaImagen);
    divEstructuraCard.appendChild(divColumnaDescripcion);
    divCard.appendChild(divEstructuraCard);
    divCards.appendChild(divCard);
}

const cargarProductos = async () => {
    const resp = await fetch(`${URL_BASE}/producto`, { method: "GET" });
    const Data = await resp.json();

    for (e of Data.data) {
        armarCardProducto(e);
    }
}

const butAgregarProductoOnClick = (e) => {
    var numID = e.target.getAttribute("idBoton");

    var producto = e.target.previousSibling.previousSibling.previousSibling;
    var cantidad = 1;
    var monto = e.target.previousSibling;

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
        td3.innerHTML = monto.lastChild.previousSibling.innerHTML;

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

        var tempMonto = (monto.lastChild.previousSibling.innerHTML) * tempCant;
        document.getElementById("colProductoMonto" + numID).innerText = tempMonto;
    }

    
    filasTabla++;

    montoTotal = parseInt(montoTotal) + parseInt(monto.lastChild.previousSibling.innerHTML);
    document.getElementById('subtotal').innerHTML = "Subtotal: S/. " + montoTotal;
}

const pagarEventos = async () => {
    var body1;
    var body2;

    body1 =
    {
        idCliente: parseInt(localStorage.getItem("idUsuario")),
        montoT: parseInt(montoTotal)
    }


    const resp1 = await fetch(`${URL_BASE}/pedido`,
        {
            method: "POST",
            body: JSON.stringify(body1),
            headers: { "Content-Type": "application/json" }
        });

    const Data1 = await resp1.json();
    const idPedidoGen = Data1.data.id;

    for (productoCC of arregloProductosCC) {
        body2 =
        {
            idPedido: idPedidoGen,
            idProducto: productoCC,
            cantidad: parseInt(document.getElementById("colProductoCant" + productoCC).innerText),
            montoP: parseInt(document.getElementById("colProductoMonto" + productoCC).innerText),
        }

        const resp2 = await fetch(`${URL_BASE}/producto_pedido`,
            {
                method: "POST",
                body: JSON.stringify(body2),
                headers: { "Content-Type": "application/json" }
            });

        localStorage.setItem("ultimoPedido", idPedidoGen);
        window.setTimeout(() => { location = "checkout.html" }, 1500);
    }
}

function main() {
    cargarProductos()
    document.getElementById("botonPagar").onclick = pagarEventos;
}

window.addEventListener("load", main);