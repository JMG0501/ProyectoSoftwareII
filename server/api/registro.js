const db = require('../dao/models');

const registro =
{
    post : async (req, res) =>
    {
        const Body = req.body;

        console.log(Body.username);

        if(Body.nombre == undefined || Body.username == undefined || Body.password == undefined || Body.apellido == undefined || Body.fechaNac == undefined)
        {
            const objError = 
            {
                msg : "Debe ingresar todos los campos"
            }
            res.status(400).json(objError);
            return;
        }

        const usuarioNuevo = 
        {
            username : Body.username,
            password : Body.password,
            nombre : Body.nombre,
            apellido : Body.apellido,
            fechaNac : Body.fechaNac,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const evGuardado = await db.Usuario.create(usuarioNuevo);

        const objRes = 
        {
            data : evGuardado,
            msg : ""
        }
        res.json(objRes);
    }
}

module.exports = registro;