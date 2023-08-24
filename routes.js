const express = require('express');
const router = express.Router();
const Person = require('./person');

// Rota para cadastrar uma nova pessoa
router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para obter informações de uma pessoa por ID
router.get('/:id', getPerson, (req, res) => {
  res.json(res.person);
});

// Rota para atualizar informações de uma pessoa por ID
router.put('/:id', getPerson, async (req, res) => {
  if (req.body.nome != null) {
    res.person.nome = req.body.nome;
  }
  if (req.body.cpf != null) {
    res.person.cpf = req.body.cpf;
  }
  if (req.body.cep != null) {
    res.person.cep = req.body.cep;
  }
  if (req.body.numero != null) {
    res.person.numero = req.body.numero;
  }
  if (req.body.complemento != null) {
    res.person.complemento = req.body.complemento;
  }
  try {
    const updatedPerson = await res.person.save();
    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para deletar uma pessoa por ID
router.delete('/:id', getPerson, async (req, res) => {
  try {
    await res.person.remove();
    res.json({ message: 'Pessoa deletada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Função middleware para obter uma pessoa por ID
async function getPerson(req, res, next) {
  try {
    const person = await Person.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    res.person = person;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
