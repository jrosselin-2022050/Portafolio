//Configuración Express

//Importaciones
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import animalRouters from '../src/animal/animal.routes.js'
import appointmentRoutes  from '../src/appointement/apppointment.routes.js'

//Configuraciones
const app = express() //Crear el servidor
config()
const port = process.env.PORT || 3200

//Configura el servidor de express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())//Aceptar o denegar las solicitudes de diferentes origenes (local, remoto) /pol[iticas de acceso]
app.use(helmet())
app.use(morgan('dev'))



//Declaracion de rutas
app.use(userRoutes)
app.use(animalRouters)
app.use(appointmentRoutes)

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
