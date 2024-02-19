const pgp = require('pg-promise')();
const db = pgp({
    // Tietokantayhteyden asetukset
    connectionString: 'postgres://postgres:vilikissa@localhost:5432/vitedb'
});

// Funktio tietojen hakemiseksi tietokannasta
function getViteData() {
    return db.any('SELECT * FROM vite_table');
}

module.exports = {
    getViteData,
}
