'use strict'

import jwt from 'jsonwebtoken'

import User from '../user/user.model.js'
import { token } from 'morgan'

export const validateJwt = async (req, res, next) => {
    try {
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        // obtener el token
        let { token } = req.header
        // verificar si viene el token
        if (!token) return res.status(401).send({ message: 'Unauthorized' })
        // obtener el id dedl usuario
        let { uid } = jwt.verify(token, secretKey)
        //validar sii el usuario aun existe en la base de datos
        let user = await User.findOne({ _id: uid })
        if (!user) return res.status(404).send({ message: 'User not foud' })
        // si todo sale bien, puede continuar
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({ message: 'a' })
    }
}


export const isAdmin = async () => {
    try {
        let { role } = req.user
        if (!role || role !== 'ADMIN') return res.status(403).send({ message: `You not have acces | username ${username}` })
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({ message: 'Unauthorized role' })
    }
}