const db = require('../dao/models');

const login =
{
  get: async (req, res) => {
    const Body = req.body;

    console.log(Body.correo);

    if (Body.correo == undefined || Body.contrasenia == undefined) {
      const objError =
      {
        msg: "Debe ingresar todos los campos"
      }
      res.status(400).json(objError);
      return;
    }

    let objRes = {};
    const user = await db.Usuario.findOne({ where: { correo: Body.correo } });
    if (user && user.contraseña === Body.contrasenia) {
      objRes = {
        data: user,
        msg: ""
      }
    } else {
      objRes = {
        data: null,
        msg: "usuario o contraseña incorrectas"
      }
    }

    res.json(objRes);
  }
}

module.exports = login;