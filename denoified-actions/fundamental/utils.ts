import { Octokit } from "octokit";

export function createOctoKit() {
  return new Octokit({
    auth: getGitHubToken(),
  });
}

export function getGitHubRepository() {
  const repoEnvVar = getEnvVarOrThrow("GH_REPOSITORY");
  const [owner, repo] = repoEnvVar.split("/");
  return {
    owner,
    repo,
  };
}

function getGitHubToken() {
  return getEnvVarOrThrow("GH_TOKEN");
}

export function getEnvVarOrThrow(name: string) {
  const value = Deno.env.get(name);
  if (value == null) {
    throw new Error(
      `Could not find environment variable ${name}. ` +
        `Ensure you are running in a GitHub action.`,
    );
  }
  return value;
}

export async function fileExists(path: string) {
  try {
    const stat = await Deno.lstat(path);

    if (!stat.isFile) {
      throw new Error(`path exists, but not a file`);
    }

    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }

    throw error;
  }
}
