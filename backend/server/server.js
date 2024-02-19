// Import modules
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

/*******
 * App *
 *******/
const app = express();
const port = 3001;

// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "vitedb",
    password: "vilikissa",
    port: 5432,
});

/***************
 * Middleware *
 ***************/
app.use(cors());
app.use(express.json());

/**********
 * Routes *
 **********/
// Test
app.get("/", (req, res) => {
    res.send("Palvelin toimii");
});

// HTTP methods / CRUD
// 1. GET
app.get("/data", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM vite_table");
        res.json(result.rows);
    } catch (error) {
        console.error("Virhe haettaessa dataa:", error);
        res.status(500).json({ error: "Virhe haettaessa dataa" });
    }
});

// 2. POST
app.post("/data", async (req, res) => {
    try {
        const client = await pool.connect();
        const { title, body } = req.body;
        const result = await client.query(
            "INSERT INTO vite_table (title, body) VALUES ($1, $2) RETURNING *",
            [title, body]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Virhe lisättäessä dataa:", error);
        res.status(500).json({ error: "Virhe lisättäessä dataa" });
    }
});

const server = app.listen(port, () => {
    console.log(`Palvelin käynnissä portissa ${port}`);
});

process.on("SIGINT", () => {
    console.log("Palvelin sammuu");
    server.close(() => {
        pool.end();
        process.exit();
    });
});
