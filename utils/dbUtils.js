const { Pool } = require('pg');
const configDb = require('../config/configDb');

const pool = new Pool({
  connectionString: configDb.postgresURI
});

const tableName = configDb.dbTable;

async function save(data) {
  const insertQuery = {
    text: `INSERT INTO ${tableName} (nome, cpf, cep, numero, complemento, logradouro, bairro, localidade, uf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    values: [data.nome, data.cpf, data.cep, data.numero, data.complemento, data.logradouro, data.bairro, data.localidade, data.uf]
  };

  const client = await pool.connect();

  try {
    const result = await client.query(insertQuery);
    return result.rows[0].id; // Retorna o ID inserido
  } finally {
    client.release();
  }
}

async function remove(id) {
  const deleteQuery = {
    text: `DELETE FROM ${tableName} WHERE id = $1`,
    values: [id]
  };

  const client = await pool.connect();

  try {
    const result = await client.query(deleteQuery);
    if (result.rowCount === 0) {
      throw new Error('Nenhum registro excluído. Pessoa não encontrada.');
    }
  } finally {
    client.release();
  }

  return { message: 'Cadastro excluído com sucesso' };
}

async function getById(id) {
  const selectQuery = {
    text: `SELECT * FROM ${tableName} WHERE id = $1`,
    values: [id]
  };

  const client = await pool.connect();

  try {
    const result = await client.query(selectQuery);
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function updateData(id, newData) {
  const updateQuery = {
    text: `UPDATE ${tableName} SET nome = $1, cpf = $2, cep = $3, numero = $4, complemento = $5, logradouro = $6, bairro = $7, localidade = $8, uf = $9 WHERE id = $10`,
    values: [newData.nome, newData.cpf, newData.cep, newData.numero, newData.complemento, newData.logradouro, newData.bairro, newData.localidade, newData.uf, id]
  };

  const client = await pool.connect();

  try {
    const result = await client.query(updateQuery);
    if (result.rowCount === 0) {
      throw new Error('Nenhum registro atualizado. Pessoa não encontrada.');
    }
  } finally {
    client.release();
  }

  return { message: 'Cadastro atualizado com sucesso' };
}

module.exports = { save, getById, remove, updateData };
