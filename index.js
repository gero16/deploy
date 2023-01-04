require('dotenv').config()

const express = require('express')
const fileUpload = require('express-fileupload')
const colors = require("colors")

const sequelize = require("./backend/db/db")
const path = require("path");

const app = express()
const port = process.env.PORT | 3000

const auth = require("./backend/routes/auth")

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


app.use('/', express.static('public/'))
app.use("/auth", auth)



app.listen(port, () => {
  console.log(colors.bgYellow(`Corriendo en puerto: ${port}`))
})