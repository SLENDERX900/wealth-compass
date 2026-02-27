import { execSync } from 'child_process';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const projectDir = '/vercel/share/v0-project';
const lockFile = join(projectDir, 'package-lock.json');

// Remove the stale lock file
if (existsSync(lockFile)) {
  unlinkSync(lockFile);
  console.log('Deleted stale package-lock.json');
} else {
  console.log('No package-lock.json found');
}

// Run npm install to regenerate it
console.log('Running npm install...');
try {
  const output = execSync('npm install --no-audit --no-fund', {
    cwd: projectDir,
    encoding: 'utf-8',
    timeout: 120000,
    stdio: ['pipe', 'pipe', 'pipe']
  });
  console.log(output);
  console.log('Successfully regenerated package-lock.json');
} catch (err) {
  console.error('npm install stderr:', err.stderr);
  console.error('npm install stdout:', err.stdout);
  throw err;
}
