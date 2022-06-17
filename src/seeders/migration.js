const schemas = require('../database/schemas');
const knex = require('../database/connection');

async function Migration() {
    try {
        const existingUserTable = await knex('usuarios')
            .select('*');

        if (existingUserTable.length > 1) return;
    } catch (error) {
        //Caso não exista tabela de usuarios, função cairá no catch onde criará a tabela.
        await knex.raw(schemas);
        return;
    };
};


module.exports = Migration;
