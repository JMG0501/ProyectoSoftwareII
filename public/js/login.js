let correo = document.getElementById("loginInputCorreo");
let password = document.getElementById("loginInputPassword");
let but = document.getElementById("loginButton");
let message = document.getElementById("loginMessage");

const validateInputs = () => {
  if (!correo.value || !password.value) {
    return false
  }
  return true
}

function setMessage(msg) {
  message.innerHTML = `<p>${msg}</p>`
}

async function sendData(data = {}) {
  return await fetch("../login", {
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

  if (!validateInputs) {
    setMessage("Complete todos los campos");
    return
  }

  let response = await sendData({
    correo: correo.value,
    contrasenia: password.value
  })

  let resData = await response.json();
  if(resData.data){
    const user= resData.data;

    if(user.esAdmin==1){
      //redireccionar a perfil de admin
      location.href=`${user.idTienda}/admin_index`;
      localStorage.setItem("idTienda", user.idTienda)
    }else{
      //redireccionar a tienda
      localStorage.setItem("idUsuario", user.id)
      location.href = `${user.id}/tiendas`;
    }
  }else{
    setMessage("Correo o contraseñas incorrectas");
  }
}
but.addEventListener("click", handleClick);
