# Mandatory II — Fullstack Auth

This is the 2nd mandatory hand-in for the 4th semester Node.js elective at Erhvervsakadami København

A fullstack authentication system, built on Svelte, Node.js with Express, and SQLite.

The application is themed as a Ratchet & Clank fan club site, because it is an awesome game series - my personal favorite is [Ratchet and Clank: Up Your Arsenal](https://en.wikipedia.org/wiki/Ratchet_%26_Clank:_Up_Your_Arsenal).

## Run the application

Use the [Makefile](Makefile) to install and run the frontend and backend in parallel:

```bash
# from mandatory-2 directory
make install
make run
```

The application needs a `.env` file — see the [.env.example](.env.example) for the variables needed.

## Documentation

I chose to spend a lot of time writing relevant documentation for each part, so I gain a better understanding of each moving part. 

### Backend
- [server](./server/README.md) — app entry, dotenv, CORS, Helmet and JWT
- [server/database/](./server/database/README.md) — `better-sqlite3` setup and schema
- [server/routers/](./server/routers/README.md) — Express Router pattern
- [server/middleware/](./server/middleware/README.md) — `rateLimiter` and `requireAuth` middleware
- [server/util/](./server/util/README.md) — bcrypt, Nodemailer, password recovery flow

### Frontend
- [client/](./client/README.md) — Svelte 5 + Vite overview, fetch util, user store
- [client/src/pages/](./client/src/pages/README.md) — Private Routes
