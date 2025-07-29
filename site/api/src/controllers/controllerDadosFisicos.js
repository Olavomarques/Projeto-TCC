const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    try {
        const { id_dadosfisicos, id_user, altura, peso, idade, sexo, exeReg, obj, deli} = req.body
        const user = await prisma.user.create({
        data: {
            id_dadosfisicos,
            id_user,
            altura,
            peso,
            idade,
            sexo,
            exeReg,
            obj,
            deli
        }
        })
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred while creating the user.' })
    }

}

async function read(req, res) {
    const { id } = req.params

    try {
        const user = await prisma.user.findMany({

        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user)
    } catch (error) {
        console.error('Error reading user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { id_dadosfisicos, id_user, altura, peso, idade, sexo, exeReg, obj, deli } = req.body

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                id_dadosfisicos,
                id_user,
                altura,
                peso,
                idade,
                sexo,
                exeReg,
                obj,
                deli
            }
        })

        res.status(200).json(user)
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(user)
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}