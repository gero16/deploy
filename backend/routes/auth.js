const { Router } = require('express')
const { traerUsuarios, indexPlantilla, loginUsuario, validateToken } = require('../controllers/auth')
const { verifyToken } = require('../middleware/auth');

const router = Router()

router.get("/", traerUsuarios)

router.post('/login',  loginUsuario);

router.get("/:user/index", indexPlantilla)

router.post("/validate-token", verifyToken, validateToken)

module.exports = router