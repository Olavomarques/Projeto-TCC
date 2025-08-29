const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { nome, id_user } = req.body

    try {
        const treino = await prisma.treino.create({
            data: {
                nome,
                id_user
            
            }
        })
        res.status(201).json(treino)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const treino = await prisma.treino.findMany({

        })

        if (!treino) {
            return res.status(404).json({ error: 'Meditation data not found' })
        }

        res.status(200).json(treino)
    } catch (error) {
        console.error('Error reading meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { nome, id_user  } = req.body

    try {
        const treino = await prisma.treino.update({
            where: { id_treino: parseInt(id) },
            data: {
                nome, 
                id_user
            }
        })

        res.status(200).json(treino)
    } catch (error) {
        console.error('Error updating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const treino = await prisma.treino.delete({
            where: { id_treino: parseInt(id) }
        })

        res.status(200).json(treino)
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