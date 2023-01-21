const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: POSTGRESQL_DATABASE,
    password: POSTGRESQL_PASSWORD,
    port: 5432
});

module.exports = pool;