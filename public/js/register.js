let but = document.getElementById("registerButton");
let nombre = document.getElementById("registerInputNombre");
let apellido = document.getElementById("registerInputApellido");
let direccion = document.getElementById("registerInputDireccion");
let telefono = document.getElementById("registerInputTelefono");
let password = document.getElementById("registerInputPassword");
let rePassword = document.getElementById("registerInputRePassword");
let correo = document.getElementById("registerInputEmail");
let checkedClient = document.getElementById("checkedClient");
let checkedAdmin = document.getElementById("checkedAdmin");
let nombreTienda = document.getElementById("nombreTienda");
let inputNombreTienda= document.getElementById("inputNombreTienda");
let message = document.getElementById("registerMessage");

function setMessage(msg) {
  message.innerHTML = `<p>${msg}</p>`
}

function validateInputs() {
  if (!nombre.value || !apellido.value || !direccion.value || !telefono.value || !password.value || !rePassword.value || !correo.value) {
    setMessage("complete todos los campos");
    return false;
  }
  if (password.value !== rePassword.value) {
    setMessage("Las contraseñas no coinciden");
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
  let data = {
    correo: correo.value,
    contrasenia: password.value,
    nombre: nombre.value,
    apellido: apellido.value,
    direccion: direccion.value,
    telefono: telefono.value,
    idTienda: null
  }
  if (!validateInputs()) {
    return
  }
  if (checkedClient.checked) {
    data = {
      //Si es cliente
      ...data,
      esAdmin: 0
    }
  } else {
    //Si es administrador de tienda
    //Crear tienda
    let response = await sendData("../tiendas", { nombreTienda: inputNombreTienda.value });
    let resData = await response.json();
    let objTienda = resData.data;

    data = {
      ...data,
      esAdmin: 1,
      idTienda: objTienda.id
    }
  }
  //Crear administrador
  await sendData("../register", data);
  location.href = "login";
}

checkedClient.addEventListener("click", () => {
  nombreTienda.setAttribute("class", "d-none form-group pb-3 mx-3");
});

checkedAdmin.addEventListener("click", () => {
  nombreTienda.setAttribute("class", "d-block form-group pb-3 mx-3");
});
but.addEventListener("click", handleClick);
