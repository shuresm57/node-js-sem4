# Database

For the database, I chose to use SQLite mainly because of ease of use; it can be quickly spun up as opposed to MySQL or Postgres that needs to be run as a independent instance, or MongoDB that requires to be deployed to a server.

Neither Cassanda, Redis or Elasticsearch matches the requirements of this application so far, hence it would be overkill to use. 

Although I could argue, that using Redis, or any other in-memory database, for the reset password functionality could be useful at some point, since there is no reason to save the tokens to a file - and it could also eliminate the need of writing to the .db file and locking it just to reset a password.

Right now, the token is cleared by a query, which could prove problematic, should the file be write locked or if the application should crash before it can be cleared.

## Database JS files

### `connection.js`

Used to set up the connection to the database, given that it exists.

I am using `better-sqlite3` since `sqlite` is deprecated and therefore no longer maintained. By setting `journal_mode = WAL`, reads and writes can happen in parallel, writes are staged in a `-wal` file while reads continue against the main database file. 

A `-shm` shared memory index is also created alongside it. The `-shm` file is a shared memory index that allows multiple connections to coordinate access to the `-wal` file efficiently.

It should be noted that these two files only exist while the server is running.

### `createDatabase.js`

This creates the database and also create the `users` table.

It also creates a test user in the database, for testing access.

### `queries.js`

Instead of having the queries in the `authRouter.js`, I made this file for better separation between the API and service layer.

The following queries exist:

| Name | Description |
|---|---|
| `findByUsername` | Looks up a user by username, returning their `id`. |
| `findByEmail` | Fetches all columns for a user matching the given email. |
| `saveUser` | Inserts a new user with email, username, and hashed password. |
| `setExpiryTokenByEmail` | Writes a password reset token and its expiry timestamp to a user record, looked up by email. |
| `findUserByToken` | Finds a user by reset token, only returning a result if the token is not yet expired. |
| `updateUserAndToken` | Updates the password for a user by id, clears the reset token and expiry. |