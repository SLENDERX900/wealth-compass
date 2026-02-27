import { execSync } from 'child_process';
import { unlinkSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

// Find the project directory - scripts get copied, so we need to find the real project
const possiblePaths = [
  '/vercel/share/v0-project',
  '/vercel/path0',
  '/home/user/project',
];

let projectDir = null;
for (const p of possiblePaths) {
  try {
    if (existsSync(join(p, 'package.json'))) {
      projectDir = p;
      break;
    }
  } catch {}
}

if (!projectDir) {
  // Try to find it by looking for package.json
  console.log('CWD:', process.cwd());
  console.log('CWD contents:', readdirSync(process.cwd()));
  if (existsSync(join(process.cwd(), 'package.json'))) {
    projectDir = process.cwd();
  } else if (existsSync(join(process.cwd(), '..', 'package.json'))) {
    projectDir = join(process.cwd(), '..');
  }
}

if (!projectDir) {
  console.error('Could not find project directory');
  process.exit(1);
}

console.log('Using project directory:', projectDir);

const lockFile = join(projectDir, 'package-lock.json');

// Remove stale lock file
if (existsSync(lockFile)) {
  unlinkSync(lockFile);
  console.log('Deleted old package-lock.json');
}

// Run npm install to create a fresh lock file
console.log('Running npm install...');
execSync('npm install --legacy-peer-deps --ignore-scripts', {
  cwd: projectDir,
  stdio: 'inherit',
  timeout: 180000,
  env: { ...process.env, npm_config_fund: 'false', npm_config_audit: 'false' }
});

console.log('Lock file regenerated successfully!');
console.log('Lock file exists:', existsSync(lockFile));
