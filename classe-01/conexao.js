const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '172.16.238.11',
    database: 'biblioteca0306',
    password: '1234Dados',
    port: 5432
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
}

