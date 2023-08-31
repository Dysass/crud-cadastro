require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URL,
    dbName: process.env.MONGO_DATABASE,
    dbCollection: process.env.MONGO_COLLECTION,
}