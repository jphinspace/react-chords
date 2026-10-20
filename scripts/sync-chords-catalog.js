const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const chordsRepository = 'https://github.com/jphinspace/chords.git';
const chordsPath = process.env.CHORDS_PATH || path.resolve(__dirname, '../vendor/chords');
const generatedCatalogPath = path.join(chordsPath, 'build', 'catalog', 'catalog.json');
const destinationPath = path.resolve(__dirname, '../.generated/catalog.json');
const gradle = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';

if (!fs.existsSync(chordsPath)) {
  throw new Error(
    `The chords checkout was not found at ${chordsPath}. ` +
    `Clone ${chordsRepository} there or set CHORDS_PATH.`
  );
}

const build = spawnSync(gradle, ['buildCatalog'], {
  cwd: chordsPath,
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

if (build.status !== 0) {
  process.exit(build.status || 1);
}

if (!fs.existsSync(generatedCatalogPath)) {
  throw new Error(`The chords build did not produce ${generatedCatalogPath}`);
}

fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
fs.copyFileSync(generatedCatalogPath, destinationPath);
console.log(`Copied chords catalog to ${destinationPath}`);
