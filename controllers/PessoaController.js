const CepController = require('../controllers/CepController');
const Pessoa = require('../models/Pessoa');
const { save, getById, remove, updateData } = require('../utils/mongoUtils');
const { ObjectId } = require('mongodb');


async function getByIdHandler(req, res) {
    try {
        const id = req.params.id;
        const objectId = new ObjectId(id);

        const pessoa = await getById(objectId);

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
        const newPessoa = createNewPessoa(nome, cpf, endereco, cep, numero, complemento);

        await save(newPessoa)

        res.status(201).json(newPessoa);
    } catch (error) {
        res.status(500).json(error);
    }
}

function createNewPessoa(nome, cpf, endereco, cep, numero, complemento) {
  const { logradouro, bairro, localidade: cidade, uf } = endereco;

  return new Pessoa(nome, cpf, cep, numero, complemento, logradouro, bairro, cidade, uf);
}

async function deletePerson(id) {
    try {
      const objectId = new ObjectId(id);
      const deletedMessage = await remove(objectId);
      return deletedMessage;
    } catch (error) {
      throw error;
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

async function update(id, newData) {
  try {
    const objectId = new ObjectId(id);
    const endereco = await getCepData(newData.cep);

    const updatedData = {
      nome: newData.nome,
      cpf: newData.cpf,
      cep: newData.cep,
      numero: newData.numero,
      complemento: newData.complemento,
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      uf: endereco.uf
    };

    const result = await updateData(objectId, updatedData);

    return { message: result.message };
  } catch (error) {
    throw error;
  }
}


module.exports = { create, getByIdHandler, deletePerson, update };
