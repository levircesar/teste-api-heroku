//gerencia o banco de dados
const path = require('path');
const knex = require('knex');
//migrations: controla as versoes do banco de dados; 
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

module.exports = db;