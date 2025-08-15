const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    const { nome, email, senha, nascimento, genero } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                nome,
                email,
                senha,
                nascimento: new Date(nascimento), 
                genero
            }
        })
        res.status(201).json(user)
    } catch (error) {
        console.error(error) 
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { nome, email, senha, nascimento, genero } = req.body

    try {
        const user = await prisma.user.update({
            where: { id_user: parseInt(id) },
            data: {
                nome,
                email,
                senha,
                nascimento: new Date(nascimento),
                genero
            }
        })
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const user = await prisma.user.delete({
            where: { id_user: parseInt(id) }
        })
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}
