import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [path.join(__dirname, 'src/server.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: path.join(__dirname, 'dist/server.cjs'),
  alias: {
    '@shared': path.resolve(__dirname, '../shared'),
    '@': path.resolve(__dirname, './src'),
  },
  logLevel: 'info',
});
