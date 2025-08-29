const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { id_ExerSelec, id_treino } = req.body

    try {
        const treinosLink = await prisma.treinosLink.create({
            data: {
                id_ExerSelec,
                id_treino
            }
        })
        res.status(201).json(treinosLink)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    try {
        const treinosLink = await prisma.treinosLink.findMany()
        res.status(200).json(treinosLink)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { id_ExerSelec, id_treino } = req.body

    try {
        const treinosLink = await prisma.treinosLink.update({
            where: { id_link: parseInt(id) },
            data: {
                id_ExerSelec,
                id_treino

            }
        })

        res.status(200).json(treinosLink)
    } catch (error) {
        console.error('Error updating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const treinosLink = await prisma.treinosLink.delete({
            where: { id_link: parseInt(id) }
        })

        res.status(200).json(treinosLink)
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