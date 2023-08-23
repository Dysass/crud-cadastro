const mongoose = require('mongoose');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const routes = require('./routes');
const Person = mongoose.model('Person', personSchema);

const personSchema = new mongoose.Schema({
  nome: String,
  cpf: Number,
  cep: Number,
  numero: Number,
  complemento: String,
  logradouro: String,
  bairro: String,
  cidade: String,
  UF: String,
});


module.exports = Person;