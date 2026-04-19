# Database

We use [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) — a synchronous SQLite driver for Node. No `await`, no callbacks, just regular function calls. SQLite stores the whole database in a single file (`mandatory2.db`), so no separate database server has to run.

## Connection

`connection.js` opens the database. The filename is resolved relative to the file itself rather than the process working directory, so the path doesn't break if the server is started from a different folder:

```javascript
import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new Database(join(__dirname, 'mandatory2.db'));
db.pragma('journal_mode = WAL');

export default db;
```

`WAL` (write-ahead logging) lets reads and writes happen in parallel, which avoids the "database is locked" errors you see with the default rollback journal.

## Schema

`createDatabase.js` creates the `users` table if it doesn't already exist. Run it once before starting the server:

```bash
node database/createDatabase.js
```

```javascript
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(2500) NOT NULL,
    reset_token TEXT,
    reset_token_expiry INTEGER
  );
`);
```

The `reset_token` and `reset_token_expiry` columns are used by the password recovery flow (see [`util/`](../util/README.md)).

## Querying

`better-sqlite3` works in two steps: prepare the statement, then call `.get()`, `.all()`, or `.run()` on it.

```javascript
// one row
const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username);

// many rows
const users = db.prepare(`SELECT * FROM users`).all();

// insert / update / delete
db.prepare(`INSERT INTO users (email, username, password) VALUES (?, ?, ?)`)
  .run(email, username, hashedPassword);
```

Parameters are spread as separate arguments, not passed as an array. Always parameterise — never string-interpolate user input into SQL.
