const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { id_profissional_user, id_profissional, id_user } = req.body

    try {
        const meditacao = await prisma.meditacao.create({
            data: {
                id_profissional_user,
                id_profissional,
                id_user
            }
        })
        res.status(201).json(meditacao)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
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
    const { id_profissional_user, id_profissional, id_user } = req.body

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                id_profissional_user,
                id_profissional,
                id_user
            }
        })

        res.status(200).json(updatedUser)
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(deletedUser)
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