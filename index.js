const express = require('express')
const sequelize = require("./backend/db/db")
const colors = require("colors")
const path = require("path");
const bodyParser = require('body-parser')

const post = require("./backend/routes/index")

const app = express()
const port = process.env.PORT | 3000

require('dotenv').config()

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./backend/views"));


app.use(express.json());
app.use(express.urlencoded({extended: false})); // Para que funcionen los formularios


const conectarBD = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion establecida');
        await sequelize.sync();
  
      } catch (error) {
        console.error('No se pudo conectar a la base', error);
      }
}

conectarBD();

// Solo me funciono de esta forma
app.use('/', express.static('public/'))

app.listen(port, () => {
  console.log(colors.bgYellow(`Corriendo en puerto: ${port}`))
})