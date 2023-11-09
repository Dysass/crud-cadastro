const express = require('express');
const app = express();
require('dotenv').config();

const cepRoutes = require('./routes/cep')
const cadastroRoutes = require('./routes/cadastro')

const port = process.env.HOST || 8080;

app.use(express.json());

app.use('/cep', cepRoutes)
app.use('/cadastro', cadastroRoutes)

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});