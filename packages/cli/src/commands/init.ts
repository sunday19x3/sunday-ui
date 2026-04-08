import fs from "fs-extra";
import path from "path";
import prompts from "prompts";
import pc from "picocolors";
import {
  type SundayUIConfig,
  writeConfig,
  readConfig,
  getRegistryDir,
  transformImports,
} from "../utils.js";

export async function init(cwd: string) {
  console.log(pc.bold("\n  sunday-ui init\n"));

  // Check if already initialized
  const existingConfig = await readConfig(cwd);
  if (existingConfig) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "sunday-ui is already initialized. Overwrite config?",
      initial: false,
    });
    if (!overwrite) {
      console.log(pc.dim("  Cancelled."));
      return;
    }
  }

  // Detect project type
  const hasAppDir = await fs.pathExists(path.join(cwd, "app"));
  const hasSrcDir = await fs.pathExists(path.join(cwd, "src"));

  const defaultCssPath = hasAppDir
    ? hasSrcDir
      ? "src/app/globals.css"
      : "app/globals.css"
    : "styles/globals.css";

  const defaultComponentsDir = hasSrcDir
    ? "src/components/ui"
    : "components/ui";
  const defaultLibDir = hasSrcDir ? "src/lib" : "lib";
  const defaultHooksDir = hasSrcDir ? "src/hooks" : "hooks";

  const response = await prompts([
    {
      type: "text",
      name: "tailwindCss",
      message: "Where is your global CSS file?",
      initial: defaultCssPath,
    },
    {
      type: "text",
      name: "components",
      message: "Where should components be installed?",
      initial: defaultComponentsDir,
    },
    {
      type: "text",
      name: "lib",
      message: "Where should lib files be installed?",
      initial: defaultLibDir,
    },
    {
      type: "text",
      name: "hooks",
      message: "Where should hooks be installed?",
      initial: defaultHooksDir,
    },
    {
      type: "text",
      name: "aliasPrefix",
      message: "Import alias prefix (e.g., @/ or ~/)?",
      initial: "@/",
    },
  ]);

  if (!response.tailwindCss) {
    console.log(pc.dim("  Cancelled."));
    return;
  }

  const prefix = response.aliasPrefix.endsWith("/")
    ? response.aliasPrefix
    : response.aliasPrefix + "/";

  const config: SundayUIConfig = {
    style: "default",
    tailwindCss: response.tailwindCss,
    components: response.components,
    lib: response.lib,
    hooks: response.hooks,
    aliases: {
      components: `${prefix}${response.components.replace(/^src\//, "")}`,
      lib: `${prefix}${response.lib.replace(/^src\//, "")}`,
      hooks: `${prefix}${response.hooks.replace(/^src\//, "")}`,
    },
  };

  // 1. Write config file
  await writeConfig(cwd, config);
  console.log(pc.green("  Created sunday-ui.json"));

  // 2. Ensure directories exist
  for (const dir of [config.components, config.lib, config.hooks]) {
    await fs.ensureDir(path.join(cwd, dir));
  }

  // 3. Copy utils.ts
  const registryDir = getRegistryDir();
  const utilsSrc = path.join(registryDir, "lib", "utils.ts");
  const utilsDest = path.join(cwd, config.lib, "utils.ts");

  if (await fs.pathExists(utilsSrc)) {
    let content = await fs.readFile(utilsSrc, "utf-8");
    content = transformImports(content, config);
    await fs.writeFile(utilsDest, content);
    console.log(pc.green(`  Created ${config.lib}/utils.ts`));
  }

  // 4. Inject CSS variables into global CSS
  const cssPath = path.join(cwd, config.tailwindCss);
  const cssTemplatePath = path.join(registryDir, "css", "sunday-ui.css");

  if (await fs.pathExists(cssTemplatePath)) {
    const cssTemplate = await fs.readFile(cssTemplatePath, "utf-8");

    if (await fs.pathExists(cssPath)) {
      const existingCss = await fs.readFile(cssPath, "utf-8");
      // Check if already injected
      if (existingCss.includes("--sui-primary")) {
        console.log(pc.dim("  CSS variables already present, skipping."));
      } else {
        // Remove the @import "tailwindcss" from template since it's likely in the existing file
        const cssWithoutImport = cssTemplate
          .replace('@import "tailwindcss";\n\n', "")
          .replace('@import "tailwindcss";\n', "");

        // Append after existing content
        const updatedCss = existingCss + "\n" + cssWithoutImport;
        await fs.writeFile(cssPath, updatedCss);
        console.log(pc.green(`  Updated ${config.tailwindCss} with theme variables`));
      }
    } else {
      // Create the CSS file with full template
      await fs.ensureDir(path.dirname(cssPath));
      await fs.writeFile(cssPath, cssTemplate);
      console.log(pc.green(`  Created ${config.tailwindCss}`));
    }
  }

  // 5. Print next steps
  console.log(
    pc.bold("\n  Done! Next steps:\n")
  );
  console.log(
    `  1. Add Poppins font to your project:\n` +
      pc.dim(
        `     pnpm add @fontsource/poppins\n` +
        `     Then import in your layout: import "@fontsource/poppins"\n`
      )
  );
  console.log(
    `  2. Install peer dependencies:\n` +
      pc.dim(
        `     pnpm add clsx tailwind-merge class-variance-authority\n`
      )
  );
  console.log(
    `  3. Add components:\n` +
      pc.dim(`     npx sunday-ui add button\n`)
  );
}
