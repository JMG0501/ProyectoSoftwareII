
const armarResumenPedido = () => 
{
    var pedidoPreliminar = localStorage.getItem("pedidoPreliminar");
    var pedidoPreliminar = JSON.parse(pedidoPreliminar);
    var resumenPedido = document.getElementById("resumenPedido");
    var montoPreliminar = localStorage.getItem("subtotalPreliminar");
    var montoTotal = parseInt(montoPreliminar)+5;

    for (let i = 0; i < pedidoPreliminar.length; i++) 
    {
        var liProducto = document.createElement('li');
        liProducto.setAttribute("class", "list-group-item d-flex justify-content-between lh-sm")
        var divDes = document.createElement('div');
        var h6 = document.createElement('h6');
        h6.setAttribute("class", "my-0");
        h6.innerHTML = pedidoPreliminar[i].nombre;
        var small = document.createElement('small');
        small.setAttribute('class', 'text-muted');
        small.innerHTML = "Unidades: " + pedidoPreliminar[i].cantidad;
        var spanMonto = document.createElement('span');
        spanMonto.setAttribute('class', 'text-muted');
        spanMonto.innerHTML = "S/. " + pedidoPreliminar[i].monto + ".00";

        divDes.appendChild(h6);
        divDes.appendChild(small);
        liProducto.appendChild(divDes);
        liProducto.appendChild(spanMonto);
        resumenPedido.appendChild(liProducto);
    }

    var liSubtotal = document.createElement('li');
    liSubtotal.setAttribute("class", "list-group-item d-flex justify-content-between");
    var span1 = document.createElement('span');
    span1.innerHTML = "Costo de productos"
    var span2 = document.createElement('span');
    span2.innerHTML = "S/. " + montoPreliminar + ".00";
    liSubtotal.appendChild(span1);
    liSubtotal.appendChild(span2);
    resumenPedido.appendChild(liSubtotal);

    var liCostoE = document.createElement('li');
    liCostoE.setAttribute("class", "list-group-item d-flex justify-content-between");
    var span3 = document.createElement('span');
    span3.innerHTML = "Costo de envío"
    var span4 = document.createElement('span');
    span4.innerHTML = "S/. 5.00";
    liCostoE.appendChild(span3);
    liCostoE.appendChild(span4);
    resumenPedido.appendChild(liCostoE);

    var liTotal = document.createElement('li');
    liTotal.setAttribute("class", "list-group-item d-flex justify-content-between");
    var strong1 = document.createElement('strong');
    strong1.innerHTML = "Total"
    var strong2 = document.createElement('strong');
    strong2.innerHTML = "S/. " + montoTotal + ".00";
    liTotal.appendChild(strong1);
    liTotal.appendChild(strong2);
    resumenPedido.appendChild(liTotal);
}

const confirmarPedido = async () =>
{
    var body1;

    body1 =
    {
        idUsuario: localStorage.getItem("idUsuario"),
        idTienda: localStorage.getItem("idTienda"),
        subtotal: localStorage.getItem("subtotalPreliminar"),
        costoEnvio: 5,
        total: parseInt(localStorage.getItem("subtotalPreliminar"))+5 
    }

    const resp1 = await fetch("http://localhost:3000/usuario_pedido", 
    {
        method : "POST",
        body: JSON.stringify(body1),
        headers : {"Content-Type" : "application/json"}
    });

    const Data1 = await resp1.json();
    const idPedidoGen = Data1.data.id;

    var pedidoPreliminar = localStorage.getItem("pedidoPreliminar");
    var pedidoPreliminar = JSON.parse(pedidoPreliminar);
    var Data2;

    for (let i = 0; i < pedidoPreliminar.length; i++) 
    {
        body2 =
        {
            idPedido: idPedidoGen,
            idProducto: pedidoPreliminar[i].idProducto,
            idTienda: pedidoPreliminar[i].idTienda,
            cantidad: pedidoPreliminar[i].cantidad,
            monto: pedidoPreliminar[i].monto
        }

        const resp2 = await fetch(`http://localhost:3000/pedido_producto`, 
        {
            method : "POST",
            body: JSON.stringify(body2),
            headers : {"Content-Type" : "application/json"}
        });
        
        Data2 = await resp2.json();
    }

    var mensajeC = document.getElementById("mensajeConfirmacion");
    mensajeC.innerHTML = "Su pedido ha sido generado correctamente con el ID: " + idPedidoGen;
}

const finPedido = () =>
{
    localStorage.setItem("pedidoPreliminar", JSON.stringify([]));
    localStorage.setItem("subtotalPreliminar", 0);
    var idUsuario = localStorage.getItem("idUsuario")
    location.href = idUsuario + "/user_pedidos";
}

const main = () => 
{
    armarResumenPedido();
    document.getElementById('registroPedido').addEventListener('click', confirmarPedido);
    document.getElementById('finPedido').addEventListener('click', finPedido);
}

window.addEventListener("load", main);
