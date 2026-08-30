const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'data.sqlite'));

// Create table if it doesn't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token_hash TEXT UNIQUE NOT NULL,
    user TEXT NOT NULL,
    site TEXT,
    expires_at INTEGER,
    revoked INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s','now'))
  )
`);

module.exports = db;
