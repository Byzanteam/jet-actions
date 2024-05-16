import { fileExists } from "../fundamental/utils.ts";
import { join } from "jsr:@std/path@^0.221.0";

export async function isMonorepoProject() {
  const rootPath = Deno.cwd();

  if (await fileExists(join(rootPath, "pnpm-workspace.yaml"))) {
    return true;
  }

  const rootPackageJsonPath = join(rootPath, "package.json");
  if (await fileExists(join(rootPath, "package.json"))) {
    const packageInfo = JSON.parse(
      await Deno.readTextFile(rootPackageJsonPath),
    );

    if (
      Array.isArray(packageInfo.workspaces) && packageInfo.workspaces.length
    ) {
      return true;
    }
  }

  return false;
}
