const { Usuario } = require("../model/model")
const { generarJWT,emailRegistro, generarToken  } = require("../helpers/index");
const colors = require('colors')

const traerUsuarios = async (req, res) => {
    const registros = await Usuario.findAll()
    //console.log( registros)
}

const loginUsuario = async (req, res) => {

    const { correo, password } = req.body;

    
    try {
    
      const usuario = await Usuario.findOne({where : {correo: correo}})
 
        console.log(colors.bgBlue(usuario))
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'El Usuario no es correcto'
            });
        }

        const tokenSesion = await generarJWT();
        console.log(tokenSesion)
        await usuario.save()
        if(tokenSesion){
          res.status(200).header("auth-token", tokenSesion).json({
            usuario:  usuario.nombre,
            correo: usuario.correo,
            token: tokenSesion
    })}
      
   
    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

const indexPlantilla = async (req, res) => {
    const usuario = req.params.user
    try {
        const user = await Usuario.findOne({ where: { usuario }})
        console.log(user)
          if(user) {

            res.status(200).render("indexUser", {
                usuario: user.usuario,
                correo: user.correo,
                name: user.nombre,
              })
          
          } else {
              console.log("En User")  
                  res.status(200).render("index", {
                      usuario: user.usuario,
                      correo: user.correo,
                      name: user.nombre,
                    })
                  } 

    } catch (error) {
      console.log(error)
    } 
  }

  const validateToken = (req, res) => {
    console.log("se paso la validacion")
    res.status(200).header("auth-token", req.body).json({
        token: req.body,
      }) 
}

const logoutUsuario = async (req, res) => {
  console.log(colors.bgBlue(req.params))
  const { user } = req.params

  try {
      const usuario = await Usuario.findOne({where: { usuario : user} });
      console.log(usuario.id)


      res.redirect("/")
  } catch (error) {
      console.log(error)
  }
  
}

module.exports = {
    traerUsuarios,
    loginUsuario,
    indexPlantilla,
    validateToken,
    logoutUsuario
}