#!/usr/bin/env -S deno run --allow-all
// Bumps the version of a mix project and opens a PR
// Usage: deno run --allow-all bump_version.ts
// Environment variables:
// - GH_TOKEN: the GitHub token
// - GH_WORKFLOW_ACTOR: the GitHub username of the actor
// - GH_REPOSITORY: the GitHub repository in the format "owner/repo"
// - RELEASE_KIND: the kind of release to make (patch, minor, major)

import { default as $, Path } from "@david/dax";

import { MixProject } from "../src/mix_project.ts";
import { Repo } from "../../fundamental/repo.ts";
import {
  createOctoKit,
  getEnvVarOrThrow,
  getGitHubRepository,
} from "../../fundamental/utils.ts";
import { format } from "@std/semver";

const rootPath = new Path(Deno.cwd());
const repo = new Repo(rootPath);
const mixProject = new MixProject(repo);

// increment the mix project version
const releaseKind = getEnvVarOrThrow("RELEASE_KIND");
if (
  releaseKind !== "patch" && releaseKind !== "minor" && releaseKind !== "major"
) {
  throw new Error("Must specify --patch, --minor, or --major");
}
$.logStep(`Incrementing version to ${releaseKind}...`);
await mixProject.increment(releaseKind);

// setup git config
const actor = getEnvVarOrThrow("GH_WORKFLOW_ACTOR");
await repo.setGitConfig(actor);

// update the lock file
const newProjectVersion = format(await mixProject.getVersion());
const originalBranch = await repo.gitCurrentBranch();
const releaseBranch = `release/${newProjectVersion}`;
const message = `chore: bump to ${newProjectVersion}`;

// Create and push branch
$.logStep(`Creating branch ${releaseBranch}...`);
await repo.gitBranch(releaseBranch);
await repo.gitAdd();
await repo.gitCommit(message);
$.logStep("Pushing branch...");
await repo.gitPush("-u", "origin", "HEAD");

// Open PR
$.logStep("Opening PR...");
const octoKit = createOctoKit();
const openedPr = await octoKit.request("POST /repos/{owner}/{repo}/pulls", {
  ...getGitHubRepository(),
  base: originalBranch,
  head: releaseBranch,
  draft: true,
  title: message,
  body: getPRBody(),
});
$.log(`Opened PR at ${openedPr.data.url}`);

function getPRBody() {
  return `Bumped ${repo.name} version\n\n` +
    `Please ensure:\n` +
    `- [ ] Target branch is correct (\`main\`)\n` +
    `- [ ] \`${repo.name}\` version is bumped correctly\n` +
    `To make edits to this PR:\n` +
    "```shell\n" +
    `git fetch origin ${releaseBranch} && git checkout -b ${releaseBranch} origin/${releaseBranch}\n` +
    "```\n" +
    `\ncc @${actor}`;
}

Deno.exit(0);
