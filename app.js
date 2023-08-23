const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const routes = require('./routes');

app.use(express.static('C:\Users\guima\OneDrive\Documentos\CRUD'));

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor Express está rodando na porta ${port}`);
  });
  
  mongoose.connect('<mongodb+srv://Guilherme123:<password>@crud.2vlfupk.mongodb.net/?retryWrites=true&w=majority>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
  db.once('open', () => {
    console.log('Conectado ao banco de dados MongoDB');
  });
  