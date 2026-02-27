import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

const projectRoot = join(import.meta.dirname, "..");

// Remove corrupted lockfile if it exists
const lockfilePath = join(projectRoot, "pnpm-lock.yaml");
if (existsSync(lockfilePath)) {
  console.log("Removing corrupted pnpm-lock.yaml...");
  unlinkSync(lockfilePath);
} else {
  console.log("No pnpm-lock.yaml found (already removed or missing).");
}

// Regenerate lockfile
console.log("Regenerating pnpm-lock.yaml...");
try {
  execSync("pnpm install --no-frozen-lockfile", {
    cwd: projectRoot,
    stdio: "inherit",
  });
  console.log("Successfully regenerated pnpm-lock.yaml!");
} catch (error) {
  console.error("Failed to regenerate lockfile:", error.message);
  process.exit(1);
}
