const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vitedb',
    password: 'vilikissa',
    port: 5432,
});

app.use(cors());

app.get('/data', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM vite_table');
        res.json(result.rows);
    } catch (error) {
        console.error('Virhe haettaessa dataa:', error);
        res.status(500).json({ error: 'Virhe haettaessa dataa' });
    }
});

const server = app.listen(port, () => {
    console.log(`Palvelin käynnissä portissa ${port}`);
});

process.on('SIGINT', () => {
    console.log('Palvelin sammuu');
    server.close(() => {
        pool.end();
        process.exit();
    });
});