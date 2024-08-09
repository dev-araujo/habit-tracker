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

    // Verifica e adiciona colunas se não existirem
    db.run(
      `CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        days TEXT,
        createdAt TEXT,
        endDate TEXT
      )`,
      (err) => {
        if (err) {
          console.error(
            "Erro ao criar ou alterar a tabela 'habits':",
            err.message
          );
        } else {
          console.log("Tabela 'habits' verificada ou criada.");
        }
      }
    );
  }
);

module.exports = db;
