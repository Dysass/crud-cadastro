const mongoose = require('mongoose');
const cepPromise = require("cep-promise")

// Define o esquema para o objeto Person
const personSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  cep: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  complemento: String,
  logradouro: String,
  bairro: String,
  cidade: String,
  UF: String
});

// Cria o modelo Person com base no esquema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
