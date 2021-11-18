<<<<<<< HEAD
const rellenarValorPedido = (e) =>
{
    var idPedido = e.target.getAttribute("idPedido");
    localStorage.setItem("idPedido", idPedido);
}

const actualizarPedido = async () =>
{
    const idTienda = localStorage.getItem("idTienda");
    const idPedido = localStorage.getItem("idPedido");
        
    var cuerpoPeticion = 
    {
        idTienda: idTienda,
        id: idPedido,
        estado: document.getElementById("inputEstado").value
    }
    
    fetch(`http://localhost:3000/usuario_pedido`, {
        method : "PUT",
        body : JSON.stringify(cuerpoPeticion),
        headers : {"Content-Type" : "application/json"}
    }).then((resp) => {
        resp.json().then((data)=> {
            if (data.msg == "") 
            {
                location.reload();
            }else 
            {
                console.log("Error al actualizar")
            }
        })
    })
}

const asignarOnClickBotonEditar = () =>
{
    const myElement = document.getElementById('filasPedidos');
    var element = myElement.firstElementChild;

    for (let i = 0; i < myElement.children.length; i++) 
    {
        var celda = element.lastElementChild;
        var botonEditar = celda.firstElementChild;
        botonEditar.onclick = rellenarValorPedido;
        element = element.nextElementSibling;
    }
}

function main() 
{
    asignarOnClickBotonEditar();
    document.getElementById('butActualizar').addEventListener('click', actualizarPedido);
}

=======
const rellenarValorPedido = (e) =>
{
    var idPedido = e.target.getAttribute("idPedido");
    localStorage.setItem("idPedido", idPedido);
}

const actualizarPedido = async () =>
{
    const idTienda = localStorage.getItem("idTienda");
    const idPedido = localStorage.getItem("idPedido");
        
    var cuerpoPeticion = 
    {
        idTienda: idTienda,
        id: idPedido,
        estado: document.getElementById("inputEstado").value
    }
    
    fetch(`http://localhost:3000/usuario_pedido`, {
        method : "PUT",
        body : JSON.stringify(cuerpoPeticion),
        headers : {"Content-Type" : "application/json"}
    }).then((resp) => {
        resp.json().then((data)=> {
            if (data.msg == "") 
            {
                location.reload();
            }else 
            {
                console.log("Error al actualizar")
            }
        })
    })
}

const asignarOnClickBotonEditar = () =>
{
    const myElement = document.getElementById('filasPedidos');
    var element = myElement.firstElementChild;

    for (let i = 0; i < myElement.children.length; i++) 
    {
        var celda = element.lastElementChild;
        var botonEditar = celda.firstElementChild;
        botonEditar.onclick = rellenarValorPedido;
        element = element.nextElementSibling;
    }
}

function main() 
{
    asignarOnClickBotonEditar();
    document.getElementById('butActualizar').addEventListener('click', actualizarPedido);
}

>>>>>>> 68b54ae5b99680789b120c7bae7ddb5c639b7acd
window.addEventListener("load", main);