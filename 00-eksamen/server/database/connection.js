import 'dotenv/config';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('bettertour.db');

export default db;
