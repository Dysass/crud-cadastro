const axios = require('axios');

async function get(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.status !== 200) {
            throw new Error('Não foi possível obter informações do CEP.');
        }

        const data = response.data;

        if (data.erro) {
            throw new Error('CEP não encontrado.');
        }

        return data;

    } catch (error) {
        throw error;
    }
}

module.exports = { get };