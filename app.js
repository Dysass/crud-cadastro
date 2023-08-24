// Importa bibliotecas necessárias
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

// Configurar o servidor Express
const app = express();
const port = process.env.PORT || 3000;

// Configura o middleware bodyParser para interpretar dados JSON
app.use(bodyParser.json());

// Conecta ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/cadastro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Configura rotas do CRUD
app.use('/cadastro', routes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
