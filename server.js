const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/cadastro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Configurar as rotas do CRUD
app.use('/cadastro', routes);

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
