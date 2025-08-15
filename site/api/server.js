const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('./swagger.json')
const app = express()
const routes = require('./src/routes')
const iaRoutesModule = require('./src/iarouter');
const iaRoutes = iaRoutesModule.default;


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(routes)
app.use('/api', iaRoutes);




app.listen(3001, (req,res) => {
    console.log(`Servidor rodando em http://localhost:3001`);
    console.log(`Acesse a documentação em http://localhost:3001/docs`);
});
