import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('bettertour.db');
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');
export default db;
