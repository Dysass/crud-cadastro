require('dotenv').config();

module.exports = {
    postgresURI: process.env.POSTGRES_URL,
    dbName: process.env.POSTGRES_DATABASE,
    dbTable: process.env.POSTGRES_TABLE,
    dbPort: process.env.POSTGRES_PORT
}