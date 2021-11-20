let nombre = document.getElementById("inputNombre");
let apellido = document.getElementById("inputApellido");
let direccion = document.getElementById("inputDireccion");
let telefono = document.getElementById("inputTelefono");
let correo = document.getElementById("inputUsername");
let message = document.getElementById("messagePerfil");
let btn = document.getElementById("saveChangesBtn");

function setMessage(msg) {
  message.innerHTML = `<p>${msg}</p>`
}

function validateInputs() {
  if (!nombre.value || !apellido.value || !direccion.value || !telefono.value  || !correo.value) {
    setMessage("Es necesario completar todos los campos");
    message.setAttribute("class", "messageFail");
    return false;
  }
  return true;
}

async function sendData(url, data = {}) {
  return await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

const handleClick = async (e) => {
  e.preventDefault();
  console.log("actualizar");
  let data = {
    id: parseInt(localStorage.getItem("idUsuario"),10),
    correo: correo.value,
    nombre: nombre.value,
    apellido: apellido.value,
    direccion: direccion.value,
    telefono: telefono.value,
  }
  console.log(data);
  if (!validateInputs()) {
    return
  }
  
  let peticion = await sendData("./perfil", data);
  let response = await peticion.json();
  if(response.msg=="updated"){
    setMessage("Se actualizo el perfil correctamente");
    message.setAttribute("class", "messageOk");
  }
}
btn.addEventListener("click", handleClick);