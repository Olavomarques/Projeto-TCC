const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    try {
        const { nome, idade, email, senha } = req.body
        const user = await prisma.user.create({
        data: {
            nome,
            idade,
            email,
            senha
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
    const { nome, idade, email, senha } = req.body

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                idade,
                email,
                senha
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

        res.status(200).json({ message: 'User deleted successfully', user })
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