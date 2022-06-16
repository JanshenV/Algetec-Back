require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DaTABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
         port: process.env.DATABASE_PORT,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = knex;
