const express = require('express')
const routes = express.Router()

const user = require('./controllers/controllerUser')
const DadosFisicos = require('./controllers/controllerDadosFisicos')
const DadosMentais = require('./controllers/controllerDadosMentais')
const Diario = require('./controllers/controllerdiario')
const Meditacao = require('./controllers/controllerMeditacao')
// const MeditacaoUser = require('./controllers/controllermedUser')



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

// routes.get('/meditacaouser', MeditacaoUser.read)
// routes.post('/meditacaouser', MeditacaoUser.create)
// routes.put('/meditacaouser/:id', MeditacaoUser.update)
// routes.delete('/meditacaouser/:id', MeditacaoUser.remove)




module.exports = routes