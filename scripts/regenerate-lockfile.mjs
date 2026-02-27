import { execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

const projectDir = '/vercel/share/v0-project';

// Remove stale lock files if they exist
const packageLock = join(projectDir, 'package-lock.json');
if (existsSync(packageLock)) {
  unlinkSync(packageLock);
  console.log('Removed old package-lock.json');
}

// Generate fresh package-lock.json
console.log('Generating fresh package-lock.json...');
try {
  execSync('npm install --package-lock-only', {
    cwd: projectDir,
    stdio: 'inherit',
    timeout: 120000,
  });
  console.log('Successfully generated package-lock.json');
} catch (err) {
  console.error('Failed to generate lock file:', err.message);
  process.exit(1);
}
