var productoIDGlobal = null;

const rellenarValoresActualesForm = (e) =>
{
    var productoIndex = e.target.getAttribute("productoIndex");
    var nombre = document.getElementById("nombre"+productoIndex);
    var imagen = document.getElementById("imagen"+productoIndex);
    var desc = document.getElementById("desc"+productoIndex);
    var precio = document.getElementById("precio"+productoIndex);

    productoIDGlobal = e.target.getAttribute("productoId");

    document.getElementById("inputNombre").value = nombre.innerText;
    document.getElementById("inputImagen").value = imagen.getAttribute("src");
    document.getElementById("inputDesc").value = desc.innerText;
    document.getElementById("inputPrecio").value = parseInt(precio.innerText);
}

const actualizarProducto = async () =>
{
    const nuevoNombre = document.getElementById("inputNombre").value;
    const nuevaImagen = document.getElementById("inputImagen").value;
    const nuevaDesc = document.getElementById("inputDesc").value;
    const nuevoPrecio = document.getElementById("inputPrecio").value;
    const nuevaCategoria = document.getElementById("inputCategoria").value;
    const idProductoM = productoIDGlobal;
    const idTiendaM = localStorage.getItem("idTienda");
    const validacionURL = /^(ftp|http|https):\/\/[^ "]+$/;

    if (validacionURL.test(nuevaImagen)) 
    {
        document.getElementById("mensajeURLE").style.display = "none";
        
        var cuerpoPeticion = 
        {
            idTienda: idTiendaM,
            idProducto: idProductoM,
            nombre: nuevoNombre,
            imagen: nuevaImagen,
            descripcion: nuevaDesc,
            precio: nuevoPrecio,
            categoria: nuevaCategoria
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
    else
    {
        document.getElementById("mensajeURLE").style.display = "";
    }

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
        var botonRegistrar = document.getElementById("idbutton"+idButton+"registrar");
        botonRegistrar.onclick = rellenarValoresActualesForm;
        element = element.nextElementSibling;
    }
}

const eliminarProducto = async () =>
{
    const idProductoE = productoIDGlobal;
    const idTiendaE = localStorage.getItem("idTienda");

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

const agregarProducto = async () =>
{
    const nuevoNombre = document.getElementById("inputNombreA").value;
    const nuevaImagen = document.getElementById("inputImagenA").value;
    const nuevaDesc = document.getElementById("inputDescA").value;
    const nuevoPrecio = document.getElementById("inputPrecioA").value;
    const idTiendaM = localStorage.getItem("idTienda");
    const validacionURL = /^(ftp|http|https):\/\/[^ "]+$/;

    if (validacionURL.test(nuevaImagen)) 
    {
        document.getElementById("mensajeURLEA").style.display = "none";
        
        var cuerpoPeticion = 
        {
            idTienda: idTiendaM,
            nombre: nuevoNombre,
            imagen: nuevaImagen,
            descripcion: nuevaDesc,
            precio: nuevoPrecio
        }
    
        fetch(`http://localhost:3000/producto_tienda`, {
            method : "POST",
            body : JSON.stringify(cuerpoPeticion),
            headers : {"Content-Type" : "application/json"}
        }).then((resp) => {
            resp.json().then((data)=> {
                if (data.msg == "") 
                {
                    location.reload();
                }else 
                {
                    console.log("Error al crear producto")
                }
            })
        })
    }
    else
    {
        document.getElementById("mensajeURLEA").style.display = "";
    }
}

const registrarStock = async () =>
{
    const nuevoProveedor = document.getElementById("inputProveedor").value;
    const nuevaCantidad = document.getElementById("inputCantidadL").value;
    const nuevaFDia = document.getElementById("inputDate").value;
    const nuevaFMes = document.getElementById("inputMonth").value;
    const nuevaFAño = document.getElementById("inputYear").value;
    const nuevaFV = new Date(nuevaFMes.toString() + " " + nuevaFDia.toString() + ", " + nuevaFAño.toString() + " 00:00:01");
    const idTiendaM = localStorage.getItem("idTienda");
    const idProductoM = productoIDGlobal;
        
    var cuerpoPeticion =
    {
        idTienda: idTiendaM,
        idProducto: idProductoM,
        proveedor: nuevoProveedor,
        cantidad: nuevaCantidad,
        fechaVencimiento: nuevaFV,
        estado: "Lote Vigente"
    }

    fetch(`http://localhost:3000/lote_producto`, {
        method: "POST",
        body: JSON.stringify(cuerpoPeticion),
        headers: { "Content-Type": "application/json" }
    }).then((resp) => {
        resp.json().then((data) => {
            if (data.msg == "") {
                location.reload();
            } else {
                console.log("Error al crear lote")
            }
        })
    })
}

function main() 
{
    asignarOnClickBotonEditar();
    document.getElementById('butActualizar').addEventListener('click', actualizarProducto);
    document.getElementById('butEliminar').addEventListener('click', eliminarProducto);
    document.getElementById('butAgregar').addEventListener('click', agregarProducto);
    document.getElementById('butRegistrar').addEventListener('click', registrarStock);
    document.getElementById("mensajeURLE").style.display = "none";
    document.getElementById("mensajeURLEA").style.display = "none";
}

window.addEventListener("load", main);