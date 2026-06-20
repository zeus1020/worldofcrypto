# Contributing to World of Crypto

Thanks for your interest in improving the game!

## Development setup

```bash
npm install
npm start
# open http://localhost:3000
```

## Project layout

- `src/` — client engine, entities, systems, UI (ES modules, no build step)
- `server/` — Express backend, regional realms, database models
- `config/` — game and server configuration
- `docs/` — architecture notes

## Guidelines

- Keep modules small and focused — one class or system per file.
- Match the existing code style (2-space indent, ES modules on the client,
  CommonJS on the server).
- Add a note to `CHANGELOG.md` for player-facing changes.
- New hero classes should extend `Hero` and register in `src/game.js`.

## License

By contributing you agree your work is released under the MIT License.
