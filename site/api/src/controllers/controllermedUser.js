const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { id_user, id_meditacao, duracao, data} = req.body

    try {
        const medUser= await prisma.medUser.create({
            data: {
                id_user,
                id_meditacao,
                duracao,
                data : new Date(),
            }
        })
        res.status(201).json(medUser)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const medUser = await prisma.medUser.findMany({

        })

        if (!medUser) {
            return res.status(404).json({ error: 'Meditation data not found' })
        }

        res.status(200).json(medUser)
    } catch (error) {
        console.error('Error reading meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { id_user, data, duracao } = req.body

    try {
        const medUser = await prisma.medUser.update({
            where: { id: parseInt(id) },
            data: {
                id_user,
                data: new Date(),
                duracao : 0,
            }
        })

        res.status(200).json(medUser)
    } catch (error) {
        console.error('Error updating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const medUser = await prisma.medUser.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(medUser)
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