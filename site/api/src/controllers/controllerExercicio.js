const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { nome, tipo, descricao, img } = req.body

    try {
        const exercicio = await prisma.exercicio.create({
            data: {
                nome,
                tipo,
                descricao,
                img
            }
        })
        res.status(201).json(exercicio)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const exercicio = await prisma.exercicio.findMany({

        })

        if (!exercicio) {
            return res.status(404).json({ error: 'Meditation data not found' })
        }

        res.status(200).json(exercicio)
    } catch (error) {
        console.error('Error reading meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { nome, tipo, descricao, img  } = req.body

    try {
        const exercicio = await prisma.exercicio.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                tipo,
                descricao,
                img
            }
        })

        res.status(200).json(exercicio)
    } catch (error) {
        console.error('Error updating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const exercicio = await prisma.exercicio.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(exercicio)
    } catch (error) {
        console.error('Error deleting meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}