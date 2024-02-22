'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'

export const nuevo = async (req, res) => {
    try {
        //capturar la data
        let data = req.body
        data.user = req.user._id
        // ----------delete data.status
        //verificar que exista el animal
        let animal = await Animal.findOne({ _id: data.animal })
        if (!animal) res.status(404).send({ message: 'Animal no encontrado' })
        //Validar que la mascota no tenga una cita activa con esa persona

        //Validar si un animal ya tiene cita o si un usuario ya tiene cita
        let appointmentExist = await Appointment.findOne({
            $or: [{
                animal: data.animal,
                user: data.user
            }, {
                user: data.user,
                date: data.date
            }]
        })
        if(appointmentExist)return res.send({message: 'Appointment alredy exist'})
        //Ejercicio.. El usuario solo puede tener una cita por dia, utilizando la sentendia or o and


        //Guardar
        let cita = new Appointment(data)
        await cita.save()
        return res.status(200).send({ message: `la cita a sido guardada, esta para ${cita.date}` })

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al guardar la cita', err })
    }

}