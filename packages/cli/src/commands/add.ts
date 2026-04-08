import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import {
  readConfig,
  getRegistryDir,
  transformImports,
  getTargetDir,
} from "../utils.js";
import {
  getRegistryItem,
  resolveAllDependencies,
  getAvailableComponents,
  type RegistryItem,
} from "../registry.js";

export async function add(components: string[], cwd: string) {
  // Read config
  const config = await readConfig(cwd);
  if (!config) {
    console.log(
      pc.red(
        "\n  sunday-ui is not initialized. Run `sunday-ui init` first.\n"
      )
    );
    return;
  }

  // If no components specified, show available
  if (components.length === 0) {
    console.log(pc.bold("\n  Available components:\n"));
    for (const comp of getAvailableComponents()) {
      console.log(`  - ${pc.cyan(comp.name)}`);
    }
    console.log(pc.dim("\n  Usage: sunday-ui add <component> [component...]\n"));
    return;
  }

  // Validate all requested components exist
  for (const name of components) {
    if (!getRegistryItem(name)) {
      console.log(pc.red(`\n  Component "${name}" not found.`));
      console.log(pc.dim("  Run `sunday-ui add` to see available components.\n"));
      return;
    }
  }

  // Resolve all dependencies
  const allItems = new Map<string, RegistryItem>();
  const npmDeps = new Set<string>();

  for (const name of components) {
    const deps = resolveAllDependencies(name);
    for (const dep of deps) {
      allItems.set(dep.name, dep);
      if (dep.npmDependencies) {
        for (const npmDep of dep.npmDependencies) {
          npmDeps.add(npmDep);
        }
      }
    }
  }

  const registryDir = getRegistryDir();

  console.log(pc.bold("\n  Installing components...\n"));

  // Copy files
  let copiedCount = 0;
  let skippedCount = 0;

  for (const [, item] of allItems) {
    for (const file of item.files) {
      const srcPath = path.join(registryDir, file);
      const fileName = path.basename(file);

      // Determine target directory based on file path
      let targetDir: string;
      if (file.startsWith("ui/")) {
        targetDir = path.join(cwd, config.components);
      } else if (file.startsWith("lib/")) {
        targetDir = path.join(cwd, config.lib);
      } else if (file.startsWith("hooks/")) {
        targetDir = path.join(cwd, config.hooks);
      } else if (file.startsWith("css/")) {
        // CSS is handled by init, skip
        continue;
      } else {
        targetDir = cwd;
      }

      const destPath = path.join(targetDir, fileName);

      // Skip if file already exists (don't overwrite user's modifications)
      if (await fs.pathExists(destPath)) {
        console.log(pc.dim(`  Skipped ${path.relative(cwd, destPath)} (already exists)`));
        skippedCount++;
        continue;
      }

      // Read, transform, and write
      if (await fs.pathExists(srcPath)) {
        await fs.ensureDir(targetDir);
        let content = await fs.readFile(srcPath, "utf-8");
        content = transformImports(content, config);
        await fs.writeFile(destPath, content);
        console.log(pc.green(`  Added ${path.relative(cwd, destPath)}`));
        copiedCount++;
      } else {
        console.log(pc.yellow(`  Warning: source file not found: ${file}`));
      }
    }
  }

  // Summary
  console.log();
  if (copiedCount > 0) {
    console.log(pc.green(`  ${copiedCount} file(s) added.`));
  }
  if (skippedCount > 0) {
    console.log(pc.dim(`  ${skippedCount} file(s) skipped (already exist).`));
  }

  // Print npm dependencies to install
  if (npmDeps.size > 0) {
    const depsStr = Array.from(npmDeps).join(" ");
    console.log(
      pc.bold("\n  Don't forget to install dependencies:\n")
    );
    console.log(pc.dim(`  pnpm add ${depsStr}\n`));
  }
}
