const express = require('express')
const routes = express.Router()

const user = require('./controllers/controllerUser')
const DadosFisicos = require('./controllers/controllerDadosFisicos')
const DadosMentais = require('./controllers/controllerDadosMentais')
const Diario = require('./controllers/controllerDiario')
const Meditacao = require('./controllers/controllerMeditacao')
const MeditacaoUser = require('./controllers/controllermedUser')
const Profissional = require('./controllers/controllerproficional')
const ProfissionalUser = require('./controllers/controllerProfissionalUser')
const Treino = require('./controllers/controllerTreino')
const TreinoUser = require('./controllers/controllerTreinoUser')






routes.get('/', function (req, res) {
    res.send('API de Pulse+')

})

routes.get('/user', user.read)
routes.post('/user', user.create)
routes.put('/user/:id', user.update)
routes.delete('/user/:id', user.remove)

routes.get('/dadosfisicos', DadosFisicos.read)
routes.post('/dadosfisicos', DadosFisicos.create)
routes.put('/dadosfisicos/:id', DadosFisicos.update)
routes.delete('/dadosfisicos/:id', DadosFisicos.remove)

routes.get('/dadosmentais', DadosMentais.read)
routes.post('/dadosmentais', DadosMentais.create)
routes.put('/dadosmentais/:id', DadosMentais.update)
routes.delete('/dadosmentais/:id', DadosMentais.remove)

routes.get('/diario', Diario.read)
routes.post('/diario', Diario.create)
routes.put('/diario/:id', Diario.update)
routes.delete('/diario/:id', Diario.remove)

routes.get('/meditacao', Meditacao.read)
routes.post('/meditacao', Meditacao.create)
routes.put('/meditacao/:id', Meditacao.update)
routes.delete('/meditacao/:id', Meditacao.remove)

routes.get('/meditacaouser', MeditacaoUser.read)
routes.post('/meditacaouser', MeditacaoUser.create)
routes.put('/meditacaouser/:id', MeditacaoUser.update)
routes.delete('/meditacaouser/:id', MeditacaoUser.remove)

routes.get('/profissional', Profissional.read)
routes.post('/profissional', Profissional.create)
routes.put('/profissional/:id', Profissional.update)
routes.delete('/profissional/:id', Profissional.remove)

routes.get('/profissionaluser', ProfissionalUser.read)
routes.post('/profissionaluser', ProfissionalUser.create)
routes.put('/profissionaluser/:id', ProfissionalUser.update)
routes.delete('/profissionaluser/:id', ProfissionalUser.remove)

routes.get('/treino', Treino.read)
routes.post('/treino', Treino.create)
routes.put('/treino/:id', Treino.update)
routes.delete('/treino/:id', Treino.remove)

routes.get('/treinouser', TreinoUser.read)
routes.post('/treinouser', TreinoUser.create)
routes.put('/treinouser/:id', TreinoUser.update)
routes.delete('/treinouser/:id', TreinoUser.remove)





module.exports = routes