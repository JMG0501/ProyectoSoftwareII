const db = require('../dao/models');

const registro =
{
    post: async (req, res) => {
        const Body = req.body;

        console.log(Body.correo);

        if (Body.correo == undefined || Body.contrasenia == undefined || Body.nombre == undefined || Body.apellido == undefined
            || Body.direccion == undefined || Body.telefono == undefined || Body.esAdmin == undefined) {
            const objError =
            {
                msg: "Debe ingresar todos los campos"
            }
            res.status(400).json(objError);
            return;
        }

        const usuarioNuevo =
        {
            correo: Body.correo,
            contraseña: Body.contrasenia,
            nombre: Body.nombre,
            apellido: Body.apellido,
            direccion: Body.direccion,
            telefono: Body.telefono,
            esAdmin: Body.esAdmin,
            idTienda: Body.idTienda,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const evGuardado = await db.Usuario.create(usuarioNuevo);

        const objRes =
        {
            data: evGuardado,
            msg: ""
        }
        res.json(objRes);
    }
}
module.exports = registro;