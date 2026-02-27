import { execSync } from 'child_process';
import { unlinkSync, existsSync } from 'fs';
import { resolve } from 'path';

// The script runs from a temp location, but the project is at a known path
const projectDir = process.env.PROJECT_DIR || process.cwd();
console.log('Working directory:', projectDir);
console.log('Files in dir:', execSync(`ls -la ${projectDir}`).toString());

// Try to find package.json to confirm location
const possiblePaths = [
  '/vercel/share/v0-project',
  '/home/user/project', 
  process.cwd(),
];

let foundDir = null;
for (const p of possiblePaths) {
  if (existsSync(resolve(p, 'package.json'))) {
    foundDir = p;
    console.log(`Found package.json at: ${p}`);
    break;
  }
}

if (!foundDir) {
  // Search for it
  try {
    const result = execSync('find / -name "package.json" -path "*/v0-project/*" -maxdepth 5 2>/dev/null || true').toString();
    console.log('Found package.json files:', result);
  } catch (e) {
    console.log('Could not search for package.json');
  }
  console.error('Could not find project directory!');
  process.exit(1);
}

// Remove existing lock files
for (const lockFile of ['package-lock.json', 'pnpm-lock.yaml', 'bun.lockb']) {
  const fullPath = resolve(foundDir, lockFile);
  if (existsSync(fullPath)) {
    unlinkSync(fullPath);
    console.log(`Deleted ${lockFile}`);
  }
}

// Generate fresh package-lock.json
console.log('Running npm install...');
try {
  execSync('npm install --package-lock-only --legacy-peer-deps', { 
    cwd: foundDir, 
    stdio: 'inherit',
    timeout: 180000 
  });
  console.log('Successfully generated package-lock.json!');
} catch (err) {
  console.error('Failed:', err.message);
  // Try alternative approach
  try {
    execSync('npm install --legacy-peer-deps', { 
      cwd: foundDir, 
      stdio: 'inherit',
      timeout: 180000 
    });
    console.log('Successfully installed with npm install!');
  } catch (err2) {
    console.error('Also failed:', err2.message);
    process.exit(1);
  }
}
