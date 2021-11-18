const URL_BASE = "http://localhost:3000";
var eventoIdGlobal = null;

const armarFila = (evento) => 
{
    const tr = document.createElement('tr');
    const thId = document.createElement('th');
    const tdNombre = document.createElement('td');
    const tdMonto = document.createElement('td');

    thId.innerHTML = evento.idEvento;
    thId.setAttribute("scope", "row");
    tdNombre.innerHTML = evento.cantidad;
    tdMonto.innerHTML = evento.montoP;

    tr.appendChild(thId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdMonto);

    return tr;
}

const cargarEventos = () => 
{
    const pedidoId = parseInt(localStorage.getItem("ultimoPedido"));

    fetch(`${URL_BASE}/evento_pedido/${pedidoId}`, 
    {
        method : "GET"
    })
    .then( (res) => {
        res.json().then((data)=> {
            if (data.msg == "") {
                document.getElementById('resumen').innerHTML = "";
                for (var ev of data.data) 
                {
                    const tr = armarFila(ev);
                    document.getElementById('resumen').appendChild(tr);
                }
            }
        })
    })
}

const main = () => 
{
    cargarEventos();
    document.getElementById("butRegresar").onclick = (() =>
    {
        location="eventos.html";
        localStorage.setItem("ultimoPedido", 0);
    });
}

window.addEventListener("load", main);
