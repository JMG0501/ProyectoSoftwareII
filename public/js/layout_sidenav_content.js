var productoIDGlobal = null;
var tiendaIDGlobal = null;

const rellenarValoresActualesForm = (e) =>
{
    var productoIndex = e.target.getAttribute("productoIndex");
    var nombre = document.getElementById("nombre"+productoIndex);
    var imagen = document.getElementById("imagen"+productoIndex);
    var desc = document.getElementById("desc"+productoIndex);
    var precio = document.getElementById("precio"+productoIndex);

    productoIDGlobal = e.target.getAttribute("productoId");
    tiendaIDGlobal = e.target.getAttribute("tiendaId");

    document.getElementById("inputNombre").value = nombre.innerText;
    document.getElementById("inputImagen").value = imagen.getAttribute("src");
    document.getElementById("inputDesc").value = desc.innerText;
    document.getElementById("inputPrecio").value = parseInt(precio.innerText);
}

const actualizarProducto = () =>
{
    const nuevoNombre = document.getElementById("inputNombre").value;
    const nuevaImagen = document.getElementById("inputImagen").value;
    const nuevaDesc = document.getElementById("inputDesc").value;
    const nuevoPrecio = document.getElementById("inputPrecio").value;
    const idProductoM = productoIDGlobal;
    const idTiendaM = tiendaIDGlobal;

    var cuerpoPeticion = 
    {
        idTienda: idTiendaM,
        idProducto: idProductoM,
        nombre: nuevoNombre,
        imagen: nuevaImagen,
        descripcion: nuevaDesc,
        precio: nuevoPrecio
    }

    fetch(`http://localhost:3000/producto_tienda`, {
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
    const myElement = document.getElementById('cardsProductos');
    var element = myElement.firstElementChild;
    for (let i = 0; i < myElement.children.length; i++) 
    {
        var idButton = element.getAttribute("productoId");
        var botonEditar = document.getElementById("idbutton"+idButton+"editar");
        botonEditar.onclick = rellenarValoresActualesForm;
        var botonBorrar = document.getElementById("idbutton"+idButton+"borrar");
        botonBorrar.onclick = rellenarValoresActualesForm;
        element = element.nextElementSibling;
    }
}

const eliminarProducto = async () =>
{
    const idProductoE = productoIDGlobal;
    const idTiendaE = tiendaIDGlobal;

    const resp = await fetch(`http://localhost:3000/producto_tienda/${idProductoE}/${idTiendaE}`, {method : "DELETE"});
    const Data = await resp.json();

    if (Data.msg == "") 
    {
        location.reload();
    }else 
    {
        console.error(Data.msg);
    }
}

function main() 
{
    asignarOnClickBotonEditar();
    document.getElementById('butActualizar').addEventListener('click', actualizarProducto);
    document.getElementById('butEliminar').addEventListener('click', eliminarProducto);
}

window.addEventListener("load", main);