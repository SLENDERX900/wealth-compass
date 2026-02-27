import { execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const projectDir = resolve('/vercel/share/v0-project');

// Remove existing lock file
const lockPath = resolve(projectDir, 'package-lock.json');
if (existsSync(lockPath)) {
  unlinkSync(lockPath);
  console.log('Deleted package-lock.json');
} else {
  console.log('No package-lock.json found');
}

// Run npm install to generate a fresh lock file
try {
  console.log('Running npm install...');
  const result = execSync('npm install --no-audit --no-fund', {
    cwd: projectDir,
    stdio: 'pipe',
    timeout: 120000,
    encoding: 'utf-8'
  });
  console.log(result);
  console.log('Successfully regenerated package-lock.json');
} catch (err) {
  console.error('npm install output:', err.stdout);
  console.error('npm install errors:', err.stderr);
  process.exit(1);
}
