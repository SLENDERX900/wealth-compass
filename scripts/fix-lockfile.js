import { execSync } from 'child_process';
import { unlinkSync, existsSync } from 'fs';

// Remove the stale lock files
const lockFile = '/vercel/share/v0-project/package-lock.json';
const bunLock = '/vercel/share/v0-project/bun.lockb';

if (existsSync(lockFile)) {
  unlinkSync(lockFile);
  console.log('Deleted package-lock.json');
}

if (existsSync(bunLock)) {
  unlinkSync(bunLock);
  console.log('Deleted bun.lockb');
}

// Regenerate package-lock.json
console.log('Running npm install to regenerate lock file...');
execSync('cd /vercel/share/v0-project && npm install --legacy-peer-deps', { stdio: 'inherit' });
console.log('Done! Lock file regenerated successfully.');
