import { execSync } from 'child_process';
import { existsSync, unlinkSync, copyFileSync, readFileSync, writeFileSync } from 'fs';

// The project is at /vercel/share/v0-project but scripts run from /home/user
// Strategy: copy package.json here, run npm install, then copy lock file back

const projectDir = '/vercel/share/v0-project';
const srcPkg = `${projectDir}/package.json`;
const destLock = `${projectDir}/package-lock.json`;

// Read the project's package.json
const pkgContent = readFileSync(srcPkg, 'utf8');
console.log('Read package.json from project');

// Write it to current working directory
writeFileSync('./package.json', pkgContent);
console.log('Wrote package.json to CWD');

// Remove existing lock file in CWD if any
if (existsSync('./package-lock.json')) {
  unlinkSync('./package-lock.json');
}

// Generate lock file only (no actual install)
console.log('Generating package-lock.json...');
execSync('npm install --package-lock-only --legacy-peer-deps', { 
  stdio: 'inherit',
  timeout: 180000 
});

// Copy the generated lock file back to the project
if (existsSync('./package-lock.json')) {
  copyFileSync('./package-lock.json', destLock);
  console.log('Copied package-lock.json to project directory');
  
  // Verify it exists
  if (existsSync(destLock)) {
    const stats = readFileSync(destLock, 'utf8');
    console.log(`Lock file size: ${stats.length} bytes`);
    console.log('Success!');
  }
} else {
  console.error('Failed to generate package-lock.json');
  process.exit(1);
}
