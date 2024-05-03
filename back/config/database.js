const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./database/habits.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
      return;
    }
    console.log("Conectado ao banco de dados SQLite.");

    db.run(
      `CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      days TEXT
    )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar a tabela 'habits':", err.message);
        } else {
          console.log("Tabela 'habits' criada ou já existente.");
        }
      }
    );
  }
);

module.exports = db;
