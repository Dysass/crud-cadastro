const mongoose = require('mongoose');

// Definir o esquema para o objeto Person
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

// Criar o modelo Person com base no esquema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
