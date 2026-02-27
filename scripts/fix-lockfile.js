import { execSync } from 'child_process';
import { unlinkSync, existsSync, rmSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Derive the project root from this script's location
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectDir = resolve(__dirname, '..');

console.log('Project directory:', projectDir);

const lockFile = `${projectDir}/package-lock.json`;
const bunLock = `${projectDir}/bun.lockb`;
const nodeModules = `${projectDir}/node_modules`;

// Remove node_modules to start completely fresh
if (existsSync(nodeModules)) {
  console.log('Removing node_modules...');
  rmSync(nodeModules, { recursive: true, force: true });
  console.log('Removed node_modules');
}

// Remove the stale lock files
if (existsSync(lockFile)) {
  unlinkSync(lockFile);
  console.log('Deleted package-lock.json');
} else {
  console.log('No package-lock.json found');
}

if (existsSync(bunLock)) {
  unlinkSync(bunLock);
  console.log('Deleted bun.lockb');
}

// Regenerate package-lock.json with a fresh npm install
console.log('Running npm install to regenerate lock file...');
try {
  execSync('npm install --legacy-peer-deps', { cwd: projectDir, stdio: 'inherit', timeout: 180000 });
  console.log('Done! Lock file regenerated successfully.');
} catch (err) {
  console.error('npm install failed:', err.message);
  process.exit(1);
}
