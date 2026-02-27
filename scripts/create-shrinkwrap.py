import subprocess
import os
import json

project_dir = "/vercel/share/v0-project"

# Remove the broken lock file
lock_path = os.path.join(project_dir, "package-lock.json")
if os.path.exists(lock_path):
    os.remove(lock_path)
    print(f"Deleted {lock_path}")

# Remove node_modules to start fresh
nm_path = os.path.join(project_dir, "node_modules")
if os.path.exists(nm_path):
    subprocess.run(["rm", "-rf", nm_path], check=True)
    print("Deleted node_modules")

# Run npm install to generate a fresh lock file
print("Running npm install...")
result = subprocess.run(
    ["npm", "install", "--no-audit", "--no-fund"],
    cwd=project_dir,
    capture_output=True,
    text=True,
    timeout=300
)
print("STDOUT:", result.stdout[-2000:] if len(result.stdout) > 2000 else result.stdout)
print("STDERR:", result.stderr[-2000:] if len(result.stderr) > 2000 else result.stderr)
print("Return code:", result.returncode)

if result.returncode == 0:
    # Now create shrinkwrap from the fresh lock file
    print("Running npm shrinkwrap...")
    result2 = subprocess.run(
        ["npm", "shrinkwrap"],
        cwd=project_dir,
        capture_output=True,
        text=True,
        timeout=60
    )
    print("STDOUT:", result2.stdout)
    print("STDERR:", result2.stderr)
    print("Return code:", result2.returncode)
    
    shrinkwrap_path = os.path.join(project_dir, "npm-shrinkwrap.json")
    if os.path.exists(shrinkwrap_path):
        size = os.path.getsize(shrinkwrap_path)
        print(f"npm-shrinkwrap.json created successfully ({size} bytes)")
    else:
        print("ERROR: npm-shrinkwrap.json was not created")
else:
    print("ERROR: npm install failed")
