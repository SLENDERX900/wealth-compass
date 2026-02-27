import { execSync } from 'child_process';
import { unlinkSync, existsSync, rmSync } from 'fs';

const projectDir = '/vercel/share/v0-project';
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
}

if (existsSync(bunLock)) {
  unlinkSync(bunLock);
  console.log('Deleted bun.lockb');
}

// Regenerate package-lock.json with a fresh npm install
console.log('Running npm install to regenerate lock file...');
try {
  execSync(`cd ${projectDir} && npm install --legacy-peer-deps`, { stdio: 'inherit', timeout: 120000 });
  console.log('Done! Lock file regenerated successfully.');
} catch (err) {
  console.error('npm install failed:', err.message);
  process.exit(1);
}
