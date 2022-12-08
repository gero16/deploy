const { Usuario } = require("../model/model")

const traerUsuarios = async (req, res) => {
    const registros = await Usuario.findAll()
    console.log(registros)
}

module.exports = {
    traerUsuarios
}