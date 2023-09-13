const express = require('express');
const app = express();


const cepRoutes = require('./routes/cep')
const cadastroRoutes = require('./routes/cadastro')

const port = 3000;

app.use(express.json());

app.use('/cep', cepRoutes)
app.use('/cadastro', cadastroRoutes)

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta (3000)`);
});