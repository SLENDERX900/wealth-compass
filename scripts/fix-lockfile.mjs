import { execSync } from 'child_process';

// Remove the stale lock file and node_modules, then do a fresh npm install
try {
  console.log('Removing node_modules and package-lock.json...');
  execSync('rm -rf /vercel/share/v0-project/node_modules /vercel/share/v0-project/package-lock.json', { stdio: 'inherit' });
  
  console.log('Running npm install to generate fresh lock file...');
  execSync('cd /vercel/share/v0-project && npm install --legacy-peer-deps', { stdio: 'inherit', timeout: 120000 });
  
  console.log('Lock file regenerated successfully!');
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
