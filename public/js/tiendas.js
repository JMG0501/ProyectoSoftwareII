const URL_BASE = "http://localhost:3000";

const armarCardTienda = (tienda) =>{
    const divCards = document.getElementById('cardsTiendas');

    var divCard = document.createElement('div');
    divCard.setAttribute('class', 'card mb-3');
    divCard.setAttribute('id', 'evento' + tienda.id);

    var divEstructuraCard = document.createElement('div');
    divEstructuraCard.setAttribute('class', 'row card-body align-items-center');

    var divColumnaImagen = document.createElement('div');
    divColumnaImagen.setAttribute('class', 'col-md-3');
    var imagenTienda = document.createElement('img');
    imagenTienda.setAttribute('class', 'img-fluid rounded mx-auto d-block');
    imagenTienda.setAttribute('src', 'https://cdn1.iconfinder.com/data/icons/farm-flat/64/stall-store-market-512.png');
    imagenTienda.setAttribute('alt', 'Market')

    var divColumnaDescripcion = document.createElement('div');
    divColumnaDescripcion.setAttribute('class', 'col-md-9');
    var divCardBody = document.createElement("div");
    divCardBody.setAttribute('class', 'card-body');
    var h5Titulo = document.createElement('h5');
    h5Titulo.setAttribute('class', 'card-title');
    h5Titulo.innerHTML = tienda.nombreTienda;
    var pText1 = document.createElement('p');
    pText1.setAttribute('class', 'card-text');
    pText1.innerHTML = "Costo de Envío: S/. " + tienda.costoEnvio + ".00"
    var pText2 = document.createElement('p');
    pText2.setAttribute('class', 'card-text');
    var smallText1 = document.createElement('small');
    smallText1.innerHTML = tienda.tiempoMin + " - " + tienda.tiempoMax + " Minutos"
    smallText1.setAttribute('class', 'text-muted')
    // Boton de Card
    var buttonTienda = document.createElement('a');
    buttonTienda.setAttribute('class', 'btn btn-success');
    buttonTienda.setAttribute('role', 'button');
    buttonTienda.innerHTML = "Ir a la tienda";
    buttonTienda.setAttribute('href', 'productos.html')

    divColumnaImagen.appendChild(imagenTienda);
    divCardBody.appendChild(h5Titulo);
    divCardBody.appendChild(pText1);
    pText2.appendChild(smallText1);
    divCardBody.appendChild(pText2);
    divCardBody.appendChild(buttonTienda);
    divColumnaDescripcion.appendChild(divCardBody);
    divEstructuraCard.appendChild(divColumnaImagen);
    divEstructuraCard.appendChild(divColumnaDescripcion);
    divCard.appendChild(divEstructuraCard);
    divCards.appendChild(divCard);
}

const cargarTiendas = async () => {
    const resp = await fetch(`${URL_BASE}/tienda`, { method: "GET" });
    const Data = await resp.json();

    for (e of Data.data) {
        armarCardTienda(e);
    }
}

function main() {
    cargarTiendas()
}

window.addEventListener("load", main);