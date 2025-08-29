const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    const {  id_user, sonoPerDia, trabPerDia, tempHobby, transt } = req.body

    try {
        const dadosMentais = await prisma.dadosMentais.create({
            data: {
                id_user,
                sonoPerDia,
                trabPerDia,
                tempHobby,
                transt
            }
        })
        res.status(201).json(dadosMentais)
    } catch (error) {
        console.error('Error creating mental data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const dadosMentais = await prisma.dadosMentais.findMany({

        })

        if (!dadosMentais) {
            return res.status(404).json({ error: 'Mental data not found' })
        }

        res.status(200).json(dadosMentais)
    } catch (error) {
        console.error('Error reading mental data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function update(req, res) {
    const { id } = req.params
    const { id_user, sonoPerDia, trabPerDia, tempHobby, transt } = req.body

    try {
        const dadosMentais = await prisma.dadosMentais.update({
            where: { id: parseInt(id) },
            data: {
                id_user,
                sonoPerDia,
                trabPerDia,
                tempHobby,
                transt
            }
        })

        res.status(200).json(dadosMentais)
    } catch (error) {
        console.error('Error updating mental data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function remove(req, res) {
    const { id } = req.params

    try {
        const dadosMentais = await prisma.dadosMentais.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(dadosMentais)
    } catch (error) {
        console.error('Error deleting mental data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}