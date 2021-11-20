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
  },
  find: async (userId) => {

    const user = await db.Usuario.findOne({ where: { id: userId } });
    return user.dataValues;
  },
  update: async (req, res) => {
    const Body = req.body;

    if (Body.id == undefined || Body.correo == undefined || Body.nombre == undefined || Body.apellido == undefined
      || Body.direccion == undefined || Body.telefono == undefined) {
      return;
    }

    const user = await db.Usuario.findOne({ where: { id: Body.id } });
    console.log(user);
    if (user) {
      await user.update({
        nombre: Body.nombre,
        apellido: Body.apellido,
        correo: Body.correo,
        direccion: Body.direccion,
        telefono: Body.telefono
      })
      await user.save()
    }
    res.json({
      user: user.dataValues,
      msg: "updated"
    })
  }
}

module.exports = login;