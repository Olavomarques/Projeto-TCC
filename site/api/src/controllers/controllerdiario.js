const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    const { id_diario, id_user, exercicio_feitos, calorias_gastas, copos_bebidos } = req.body

    try {
        const dadosFisicos = await prisma.dadosFisicos.create({
            data: {
                id_diario,
                id_user,
                exercicio_feitos,
                calorias_gastas,
                copos_bebidos
            }
        })
        res.status(201).json(dadosFisicos)
    } catch (error) {
        console.error('Error creating physical data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const diario = await prisma.diario.findMany({

        })

        if (!diario) {
            return res.status(404).json({ error: 'Diario not found' })
        }

        res.status(200).json(diario)
    } catch (error) {
        console.error('Error reading diario:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { id_user, exercicio_feitos, calorias_gastas, copos_bebidos } = req.body

    try {
        const diario = await prisma.diario.update({
            where: { id: parseInt(id) },
            data: {
                id_user,
                exercicio_feitos,
                calorias_gastas,
                copos_bebidos
            }
        })

        res.status(200).json(diario)
    } catch (error) {
        console.error('Error updating diario:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const diario = await prisma.diario.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(diario)
    } catch (error) {
        console.error('Error deleting diario:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}