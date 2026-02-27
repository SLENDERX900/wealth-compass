import subprocess
import os

project_dir = '/vercel/share/v0-project'
lock_file = os.path.join(project_dir, 'package-lock.json')

# Remove stale lock file if it exists
if os.path.exists(lock_file):
    os.remove(lock_file)
    print('Removed old package-lock.json')

# Generate fresh package-lock.json
print('Generating fresh package-lock.json...')
result = subprocess.run(
    ['npm', 'install', '--package-lock-only'],
    cwd=project_dir,
    capture_output=True,
    text=True,
    timeout=120
)

print('STDOUT:', result.stdout)
print('STDERR:', result.stderr)

if result.returncode == 0:
    print('Successfully generated package-lock.json')
else:
    print(f'Failed with return code: {result.returncode}')
