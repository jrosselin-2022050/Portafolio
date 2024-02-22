'user strict'

import express from 'express'
import {test, register, login, update, deleteU} from './user.controller.js'
import { isAdmin, validateJwt } from '../middlewates/validate-jwt.js'

const api = express.Router()



api.get('/test', [validateJwt, isAdmin], test)// acceder solo si estan logiados
api.post('/register', register)
api.post('/login', login)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)
export default api

// export const api // se usa si o si el nombre que esta en este archivo
// export default api // importa con otro nombre

