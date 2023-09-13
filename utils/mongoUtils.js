const { MongoClient, ObjectId } = require('mongodb');
const configDb = require('./../config/configDb');


async function save(data) {
  const mongoURI = configDb.mongoURI
  const dbName = configDb.dbName;
  const collectionName = configDb.dbCollection;

  const client = await MongoClient.connect(mongoURI);
  const db = client.db(dbName);

  await db.collection(collectionName).insertOne(data);

  client.close();
}

async function remove(id) {
  const mongoURI = configDb.mongoURI;
  const dbName = configDb.dbName;
  const collectionName = configDb.dbCollection;

  const client = await MongoClient.connect(mongoURI);
  const db = client.db(dbName);

  const result = await db.collection(collectionName).deleteOne({ _id: id });

  client.close();

  if (result.deletedCount === 0) {
    throw new Error('Nenhum registro excluído. Pessoa não encontrada.');
  }

  return { message: 'Cadastro excluído com sucesso' };
}

async function getById(id) {
  const mongoURI = configDb.mongoURI;
  const dbName = configDb.dbName;
  const collectionName = configDb.dbCollection;

  const client = await MongoClient.connect(mongoURI);
  const db = client.db(dbName);

  const result = await db.collection(collectionName).findOne({ _id: id });

  client.close();

  return result;
}

async function updateData(id, newData) {
  const mongoURI = configDb.mongoURI;
  const dbName = configDb.dbName;
  const collectionName = configDb.dbCollection;

  const client = await MongoClient.connect(mongoURI);
  const db = client.db(dbName);


  const updateQuery = {
    $set: {
      nome: newData.nome,
      cpf: newData.cpf,
      cep: newData.cep,
      numero: newData.numero,
      complemento: newData.complemento,
      logradouro: newData.logradouro,
      bairro: newData.bairro,
      cidade: newData.cidade,
      uf: newData.uf
    }
  };

  const result = await db.collection(collectionName).updateOne({ _id: id }, updateQuery);

  client.close();

  if (result.modifiedCount === 0) {
    throw new Error('Nenhum registro atualizado. Pessoa não encontrada.');
  }

  return { message: 'Cadastro atualizado com sucesso' };
}


module.exports = { save, getById, remove, updateData };
