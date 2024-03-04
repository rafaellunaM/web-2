const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();

const pool = new Pool({
    user: 'teste',
    host: 'localhost',
    database: 'usuarios',
    password: 'teste',
    port: 5432,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

app.post('/query', async (req, res) => {
    const { sqlQuery } = req.body;
    try {
        const result = await pool.query(sqlQuery);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao executar consulta no PostgreSQL' });
    }
});

module.exports = app;
