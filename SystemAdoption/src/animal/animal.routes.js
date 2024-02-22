'use strict'
import  express  from 'express'
import { actualizar, buscar, eliminar, nuevo, search } from "./animal.controller.js"

const api = express.Router()

//api.get('/testanimal', test)
api.post('/Nuevo', nuevo)
api.put('/Editar/:id', actualizar)
api.get('/Buscar', buscar)
api.delete('/Eliminar/:id', eliminar)
api.post('/buscar',search)

export default api