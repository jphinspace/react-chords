const path = require('path');

async function buildRenderer() {
  const { build } = await import('vite');
  const configFile = path.resolve(__dirname, '../vite.config.mjs');

  await build({ configFile });
}

buildRenderer().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
