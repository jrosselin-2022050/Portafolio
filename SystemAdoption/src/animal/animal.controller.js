'use strict'
import Animal from './animal.model.js'
import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'




export const nuevo = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        //validar que el keeper exista
        let user = await User.findOne({ _id: data.keeper })
        if (!user) return res.status(404).send({ message: 'keeper not foud' })

        let pet = new Animal(data)
        await pet.save()
        return res.send({ message: 'Guardado' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al agregar el animal' })
    }
}

export const buscar = async (req, res) => {
    try {
        let animals = await Animal.find()
        return res.send({ animals })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error en base de datos' })

    }

}

export const actualizar = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot update or mising data' })
        let updateAni = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('keeper', ['name', 'phone'])
        if (!updateAni) return res.status(401).send({ message: 'No se pudo actualizar correctamente' })
        return res.send({ message: 'Actualizado', updateAni })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al actualizar' })
    }
}

export const eliminar = async (req, res) => {
    try {
        let { id } = req.params
        let eliminarAni = await Animal.findOneAndDelete({ _id: id })
        if (!eliminarAni) return res.status(404).send({ message: 'Animal no eliminado' })
        return res.send({ message: `Animal con el nombre ${eliminarAni.nombre} se elimino` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al eliminar' })
    }
}


export const search = async(req, res)=>{
    try{
        let {search} = req.body
        //buscar
        let animals = await Animal.find(
            {name: search}
        ).populate('keeper', ['name', 'Phone'])

        if(animals.length == 0) return res.status(404).send({message: 'Animal no encontrado'})
        return res.send({message: 'Animal encontrado', animals})

    }catch(err){
        console.error(err)
        return res.status(500).send({message:'Error de busqueda'})
    }
}
