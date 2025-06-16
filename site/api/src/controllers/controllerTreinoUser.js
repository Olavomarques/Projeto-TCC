const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    const { id_user, id_treino } = req.body

    try {
        const treino = await prisma.treino.create({
            data: {
                id_user,
                id_treino
            }
        })
        res.status(201).json(treino)
    } catch (error) {
        console.error('Error creating treino data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const treino = await prisma.treino.findMany({

        })

        if (!treino) {
            return res.status(404).json({ error: 'Treino not found' })
        }

        res.status(200).json(treino)
    } catch (error) {
        console.error('Error reading treino:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { id_user, id_treino } = req.body

    try {
        const updatedTreino = await prisma.treino.update({
            where: { id: parseInt(id) },
            data: {
                id_user,
                id_treino
            }
        })

        res.status(200).json(updatedTreino)
    } catch (error) {
        console.error('Error updating treino:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const treino = await prisma.treino.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(treino)
    } catch (error) {
        console.error('Error deleting treino:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}
