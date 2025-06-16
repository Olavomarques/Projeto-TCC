const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    const { name, email, senha, nascimento, genero } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                senha,
                nascimento,
                genero
            }
        })
        res.status(201).json(user)
    } catch (error) {
        console.error('Error creating user:', error)
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
    const { name, email, senha, nascimento, genero } = req.body

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                senha,
                nascimento,
                genero
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