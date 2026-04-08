import fs from "fs-extra";
import path from "path";

export interface SundayUIConfig {
  style: string;
  tailwindCss: string;
  components: string;
  lib: string;
  hooks: string;
  aliases: {
    components: string;
    lib: string;
    hooks: string;
  };
}

const CONFIG_FILE = "sunday-ui.json";

export function getConfigPath(cwd: string): string {
  return path.join(cwd, CONFIG_FILE);
}

export async function readConfig(cwd: string): Promise<SundayUIConfig | null> {
  const configPath = getConfigPath(cwd);
  if (await fs.pathExists(configPath)) {
    return fs.readJson(configPath);
  }
  return null;
}

export async function writeConfig(
  cwd: string,
  config: SundayUIConfig
): Promise<void> {
  const configPath = getConfigPath(cwd);
  await fs.writeJson(configPath, config, { spaces: 2 });
}

/**
 * Get the directory where registry source files are stored.
 * In development, this is `../../registry` relative to cli/dist.
 * When published, the `registry` folder is included via package.json `files`.
 */
export function getRegistryDir(): string {
  // __dirname equivalent for ESM
  const cliDir = path.dirname(new URL(import.meta.url).pathname);
  // Try published location first (cli/registry/)
  const publishedPath = path.join(cliDir, "..", "registry");
  // Fallback to monorepo dev location
  const devPath = path.join(cliDir, "..", "..", "registry");

  if (fs.pathExistsSync(publishedPath)) return publishedPath;
  return devPath;
}

/**
 * Transform import paths in a file to match the user's aliases.
 */
export function transformImports(
  content: string,
  config: SundayUIConfig
): string {
  let result = content;

  // Transform @/lib/* → user's lib alias
  result = result.replace(
    /from\s+["']@\/lib\/(.*?)["']/g,
    `from "${config.aliases.lib}/$1"`
  );

  // Transform @/hooks/* → user's hooks alias
  result = result.replace(
    /from\s+["']@\/hooks\/(.*?)["']/g,
    `from "${config.aliases.hooks}/$1"`
  );

  // Transform @/components/* → user's components alias
  result = result.replace(
    /from\s+["']@\/components\/(.*?)["']/g,
    `from "${config.aliases.components}/$1"`
  );

  return result;
}

/**
 * Determine the target directory for a registry item type.
 */
export function getTargetDir(
  cwd: string,
  config: SundayUIConfig,
  type: "ui" | "lib" | "hook" | "css"
): string {
  switch (type) {
    case "ui":
      return path.join(cwd, config.components);
    case "lib":
      return path.join(cwd, config.lib);
    case "hook":
      return path.join(cwd, config.hooks);
    case "css":
      return cwd;
    default:
      return cwd;
  }
}
