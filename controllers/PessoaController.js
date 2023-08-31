const CepController = require('../controllers/CepController');
const Pessoa = require('../models/Pessoa');
const { save } = require('../utils/mongoUtils');

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

module.exports = { create };
