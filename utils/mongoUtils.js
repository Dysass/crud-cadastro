const { MongoClient } = require('mongodb');
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

module.exports = { save, getById };
