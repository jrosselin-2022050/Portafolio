import { Router } from "express";
import { nuevo } from "./appointment.controller.js";

const api = Router()

//Rutas rpivadas

api.post('/nuevoC', nuevo)

export default api