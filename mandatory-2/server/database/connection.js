import Database from 'better-sqlite3';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new Database(join(__dirname, 'mandatory2.db'));
db.pragma('journal_mode = WAL');

export default db;