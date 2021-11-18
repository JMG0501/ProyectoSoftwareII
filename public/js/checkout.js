const URL_BASE = "http://localhost:3000";
var eventoIdGlobal = null;

const armarFilaResumen = (producto) => 
{

    var liProducto = document.createElement('li');
    liProducto.setAttribute("class", "list-group-item d-flex justify-content-between lh-sm")
    var divDes = document.createElement('div');
    var h6 = document.createElement('h6');
    h6.setAttribute("class", "my-0");
    h6.innerHTML = producto.idProducto
    var small = document.createElement('small');
    small.setAttribute('class', 'text-muted');
    small.innerHTML = "Unidades: " + producto.cantidad;
    var spanMonto = document.createElement('span');
    spanMonto.setAttribute('class', 'text-muted');
    spanMonto.innerHTML = "S/. " + producto.montoP + ".00";

    divDes.appendChild(h6);
    divDes.appendChild(small);
    liProducto.appendChild(divDes);
    liProducto.appendChild(spanMonto);

    return liProducto;
}

const cargarEventos = () => 
{
    const pedidoId = parseInt(localStorage.getItem("ultimoPedido"));

    fetch(`${URL_BASE}/producto_pedido/${pedidoId}`, 
    {
        method : "GET"
    })
    .then( (res) => {
        res.json().then((data)=> {
            if (data.msg == "") {
                document.getElementById('resumenPedido').innerHTML = "";
                for (var ev of data.data) 
                {
                    const tr = armarFilaResumen(ev);
                    document.getElementById('resumenPedido').appendChild(tr);
                }
            }
        })
    })
}

const main = () => 
{
    cargarEventos();

    /*document.getElementById("butRegresar").onclick = (() =>
    {
        location="eventos.html";
        localStorage.setItem("ultimoPedido", 0);
    });*/
}

window.addEventListener("load", main);
