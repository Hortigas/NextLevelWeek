//importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose();
//cruiar o objeto que ira fazer operacoes no banco de dados
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;

db.serialize(() => {
    //     //com comandos sql eu vou:

    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);
    //     //deletar um dado da tabela
    //     db.run(`DELETE FROM places WHERE id = ?`, [1], dbResponse);
});
