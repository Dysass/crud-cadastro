const CepController = require('../controllers/CepController');
const Pessoa = require('../models/Pessoa');
const { save, getById, remove, updateData } = require('../utils/dbUtils');

async function getByIdHandler(req, res) {
  try {
    const id = req.params.id;

    const pessoa = await getById(id);

    if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }

    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const { nome, cpf, cep, numero, complemento } = req.body;
    const endereco = await getCepData(cep);
    const newPessoa = await createNewPessoa(nome, cpf, endereco, cep, numero, complemento);

    const newPersonId = await save(newPessoa);

    res.status(201).json({ id: newPersonId, ...newPessoa });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createNewPessoa(nome, cpf, endereco, cep, numero, complemento) {
  const { logradouro, bairro, localidade, uf } = endereco;
  return new Pessoa(nome, cpf, cep, numero, complemento, logradouro, bairro, localidade, uf);
}

async function deletePerson(req, res) {
  try {
    const id = req.params.id;
    const deletedMessage = await remove(id);
    res.status(200).json(deletedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCepData(cep) {
  try {
    const cepData = await CepController.get(cep);
    return cepData;
  } catch (error) {
    throw error;
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updatedData = await updateData(id, newData);

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { create, getByIdHandler, deletePerson, update };
