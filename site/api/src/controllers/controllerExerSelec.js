const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { id_exercicio, series, repeticoes, peso } = req.body

    try {
        const exerSelec = await prisma.exerSelec.create({
            data: {
                id_exercicio,
                series,
                repeticoes,
                peso
            }
        })
        res.status(201).json(exerSelec)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const exerSelec = await prisma.exerSelec.findMany({

        })

        if (!exerSelec) {
            return res.status(404).json({ error: 'Meditation data not found' })
        }

        res.status(200).json(exerSelec)
    } catch (error) {
        console.error('Error reading meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { id_exercicio, series, repeticoes, peso  } = req.body

    try {
        const exerSelec = await prisma.exerSelec.update({
            where: { id_ExerSelec: parseInt(id) },
            data: {
                id_exercicio,
                series,
                repeticoes,
                peso


            }
        })

        res.status(200).json(exerSelec)
    } catch (error) {
        console.error('Error updating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const exerSelec = await prisma.exerSelec.delete({
            where: { id_ExerSelec: parseInt(id) }
        })

        res.status(200).json(exerSelec)
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