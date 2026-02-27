import subprocess
import os
import json

project_dir = "/vercel/share/v0-project"

# Delete existing lock file if present
lock_path = os.path.join(project_dir, "package-lock.json")
if os.path.exists(lock_path):
    os.remove(lock_path)
    print(f"Deleted {lock_path}")
else:
    print("No package-lock.json found")

# Run npm install to regenerate lock file
print("Running npm install...")
result = subprocess.run(
    ["npm", "install", "--no-audit", "--no-fund"],
    cwd=project_dir,
    capture_output=True,
    text=True,
    timeout=120
)

print(f"npm install stdout: {result.stdout[-2000:] if result.stdout else 'empty'}")
print(f"npm install stderr: {result.stderr[-2000:] if result.stderr else 'empty'}")
print(f"npm install return code: {result.returncode}")

# Verify lock file was created
if os.path.exists(lock_path):
    size = os.path.getsize(lock_path)
    print(f"New package-lock.json created ({size} bytes)")
    
    # Verify it's valid JSON
    with open(lock_path, 'r') as f:
        data = json.load(f)
    print(f"Lock file is valid JSON with {len(data.get('packages', {}))} packages")
else:
    print("ERROR: package-lock.json was not created!")
