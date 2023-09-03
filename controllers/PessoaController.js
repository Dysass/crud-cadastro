const CepController = require('../controllers/CepController');
const Pessoa = require('../models/Pessoa');
const { save, getById } = require('../utils/mongoUtils');
const { ObjectId } = require('mongodb');
const { remove } = require('../utils/mongoUtils');
const { updateData } = require('../utils/mongoUtils');


async function getByIdHandler(req, res) {
    try {
        const id = req.params.id;
        const objectId = new ObjectId(id); // Converte o ID para ObjectId

        const pessoa = await getById(objectId); // Passa o objectId como argumento

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

function createNewPessoa(nome, cpf, endereco, cep, numero, complemento) {
    const { logradouro, bairro, localidade: cidade, uf } = endereco;

    return new Pessoa(nome, cpf, cep, numero, complemento, logradouro, bairro, cidade, uf);
}


async function update(id, newData) {
    try {
      const objectId = new ObjectId(id);
      const updatedData = await updateData(objectId, newData);
      return updatedData;
    } catch (error) {
      throw error;
    }
  }


module.exports = { create, getByIdHandler, deletePerson, update };
