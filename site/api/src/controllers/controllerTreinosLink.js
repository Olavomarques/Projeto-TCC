const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { id_ExerSelec, id_treino } = req.body

    try {
        const treinoLink = await prisma.treinoLink.create({
            data: {
                id_ExerSelec,
                id_treino
            }
        })
        res.status(201).json(treinoLink)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const treinoLink = await prisma.treinoLink.findMany({

        })

        if (!treinoLink) {
            return res.status(404).json({ error: 'Meditation data not found' })
        }

        res.status(200).json(treinoLink)
    } catch (error) {
        console.error('Error reading meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { id_ExerSelec, id_treino } = req.body

    try {
        const treinoLink = await prisma.treinoLink.update({
            where: { id: parseInt(id) },
            data: {
                id_ExerSelec,
                id_treino

            }
        })

        res.status(200).json(treinoLink)
    } catch (error) {
        console.error('Error updating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const treinoLink = await prisma.treinoLink.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(treinoLink)
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