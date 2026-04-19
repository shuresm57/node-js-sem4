# Mandatory II — Fullstack Auth

A fullstack authentication system, built on Svelte, Node.js with Express, and SQLite.

This is the 2nd mandatory hand-in for the 4th semester Node.js elective at Erhvervsakadami København

The application is themed as a Ratchet & Clank fan club site, because it is an awesome game.

## Run the application

Use the [Makefile](Makefile) to run the frontend and backend in parallel:

```bash
make run
```

The application needs a `.env` file — see the [.env.example](.env.example) for the variables needed.

## Documentation

**Backend**
- [`server/`](./server/README.md) — app entry, dotenv, CORS, Helmet, Rate Limiting
- [`server/database/`](./server/database/README.md) — `better-sqlite3` setup and schema
- [`server/routers/`](./server/routers/README.md) — Express Router pattern
- [`server/middleware/`](./server/middleware/README.md) — JWT and the `requireAuth` middleware
- [`server/util/`](./server/util/README.md) — bcrypt, Nodemailer, password recovery flow

**Frontend**
- [`client/`](./client/README.md) — Svelte 5 + Vite overview, fetch util, user store
- [`client/src/pages/`](./client/src/pages/README.md) — Private Routes
