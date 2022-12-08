const { Router } = require('express')
const { traerUsuarios } = require('../controllers/index')

const router = Router()

router.get("/", traerUsuarios)


module.exports = router