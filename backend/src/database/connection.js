const knex = require('knex');//importando o knex
const configuration = require('../../knexfile');//mostrando o caminho do arquivo onde temos a conexão com o banco

const connection = knex(configuration.development); //colocando na const essa conexão, no caso o development

module.exports = connection; //exportando para usarmos no em outras partes do código