const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { id_meditacao, nome, descricao } = req.body

    try {
        const meditacao = await prisma.meditacao.create({
            data: {
                id_meditacao,
                nome,
                descricao
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
        const meditacao = await prisma.meditacao.findMany({

        })

        if (!meditacao) {
            return res.status(404).json({ error: 'Meditation data not found' })
        }

        res.status(200).json(meditacao)
    } catch (error) {
        console.error('Error reading meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { nome, descricao } = req.body

    try {
        const meditacao = await prisma.meditacao.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                descricao
            }
        })

        res.status(200).json(meditacao)
    } catch (error) {
        console.error('Error updating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const meditacao = await prisma.meditacao.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(meditacao)
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