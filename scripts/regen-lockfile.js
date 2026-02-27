import { execSync } from 'child_process';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const projectDir = '/vercel/share/v0-project';
const lockFile = join(projectDir, 'package-lock.json');
const nodeModules = join(projectDir, 'node_modules');

// Remove existing lock file
if (existsSync(lockFile)) {
  unlinkSync(lockFile);
  console.log('Deleted package-lock.json');
} else {
  console.log('No package-lock.json found');
}

// Remove node_modules
try {
  execSync(`rm -rf ${nodeModules}`, { stdio: 'inherit' });
  console.log('Deleted node_modules');
} catch (e) {
  console.log('No node_modules to delete');
}

// Run npm install to regenerate lock file
console.log('Running npm install...');
try {
  execSync('npm install', { cwd: projectDir, stdio: 'inherit' });
  console.log('Successfully regenerated package-lock.json');
} catch (e) {
  console.error('npm install failed:', e.message);
}
