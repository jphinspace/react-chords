# Chords tester

This project uses [Vite](https://vite.dev/) for development and production builds, and [Vitest](https://vitest.dev/) for tests.

The tester consumes the generated catalog from [jphinspace/chords](https://github.com/jphinspace/chords), tracked as the `vendor/chords` Git submodule. Before starting, testing, or building, an npm lifecycle hook runs that submodule's `buildCatalog` task and copies `build/catalog/catalog.json` into the ignored `.generated/` directory. The catalog is generated locally and is not checked into this repository.

Install the UI dependencies from the repository root, then start the app:

```bash
npm install
npm start
```

The UI consumes the renderer from the local [`react-chords/`](./react-chords/) package.

The submodule is initialized automatically when cloning with `--recurse-submodules`. For an existing clone, run:

```bash
git submodule update --init --recursive
```

Set `CHORDS_PATH` if you need to use a different checkout instead:

```bash
CHORDS_PATH=/path/to/chords npm start
```

In the project directory, you can run:

### `npm start`

Runs the Vite development server at [http://localhost:3000](http://localhost:3000).

### `npm test`

Launches Vitest in watch mode. Use `npm run test:run` for a single non-interactive run.

### `npm run build`

Builds the optimized production site into the ignored `dist` folder. GitHub Pages deployment is handled by [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml).

### `npm run preview`

Serves the production build locally for verification.
