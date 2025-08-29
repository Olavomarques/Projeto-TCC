const express = require('express')
const routes = express.Router()

const user = require('./controllers/controllerUser')
const DadosFisicos = require('./controllers/controllerDadosFisicos')
const DadosMentais = require('./controllers/controllerDadosMentais')
const Diario = require('./controllers/controllerdiario')
const Meditacao = require('./controllers/controllerMeditacao')
const MedUser = require('./controllers/controllermedUser')
const Exercicio = require('./controllers/controllerExercicio')
const ExerSelec = require('./controllers/controllerExerSelec')
const Treino = require('./controllers/controllerTreino')
const TreinoLink = require('./controllers/controllerTreinosLink')
const MiddlewareAuth = require('./middlewares/auth');
const Login = require('./controllers/login');

routes.get('/', function (req, res) {
    res.send('API de Pulse+')

})

routes.post('/login', Login.login);
routes.get('/validacao', Login.validaToken);

routes.get('/user', MiddlewareAuth, user.read)
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

routes.get('/MedUser', MedUser.read)
routes.post('/MedUser', MedUser.create)
routes.put('/MedUser/:id', MedUser.update)
routes.delete('/MedUser/:id', MedUser.remove)

routes.get('/exercicio', Exercicio.read)
routes.post('/exercicio', Exercicio.create)
routes.put('/exercicio/:id', Exercicio.update)
routes.delete('/exercicio/:id', Exercicio.remove)

routes.get('/exerselec', ExerSelec.read)
routes.post('/exerselec', ExerSelec.create)  
routes.put('/exerselec/:id', ExerSelec.update)
routes.delete('/exerselec/:id', ExerSelec.remove)

routes.get('/treino', Treino.read)
routes.post('/treino', Treino.create)
routes.put('/treino/:id', Treino.update)
routes.delete('/treino/:id', Treino.remove)

routes.get('/treinolink', TreinoLink.read)
routes.post('/treinolink', TreinoLink.create)
routes.put('/treinolink/:id', TreinoLink.update)
routes.delete('/treinolink/:id', TreinoLink.remove)


module.exports = routes