import { fileExists } from "../fundamental/utils.ts";
import { join } from "@std/path";
import { parse } from "@std/yaml";

export async function isMonorepoProject() {
  const rootPath = Deno.cwd();

  const pnpmWorkspaceYamlPath = join(rootPath, "pnpm-workspace.yaml");
  if (await fileExists(pnpmWorkspaceYamlPath)) {
    const content = parse(pnpmWorkspaceYamlPath) as {
      packages?: Array<string>;
    };

    if (content.packages && content.packages.length) {
      return true;
    }
  }

  const rootPackageJsonPath = join(rootPath, "package.json");
  if (await fileExists(join(rootPath, "package.json"))) {
    const packageInfo = JSON.parse(
      await Deno.readTextFile(rootPackageJsonPath),
    );

    return Array.isArray(packageInfo.workspaces) &&
      packageInfo.workspaces.length;
  }

  return false;
}
