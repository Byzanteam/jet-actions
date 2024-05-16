#!/usr/bin/env -S deno run --allow-all

// Bumps the version of a mix project and opens a PR
// Usage: deno run --allow-all bump_version.ts
// Environment variables:
// - GH_TOKEN: the GitHub token
// - GH_WORKFLOW_ACTOR: the GitHub username of the actor
// - RELEASE_KIND: the kind of release to make (patch, minor, major)
// - PACKAGE_FILE: the update app package.json file path

import { format, increment, parse, type ReleaseType } from "@std/semver";

import { Repo } from "../../fundamental/repo.ts";
import {
  createOctoKit,
  getEnvVarOrThrow,
  getGitHubRepository,
} from "../../fundamental/utils.ts";
import { default as $, Path } from "@david/dax";
import { isMonorepoProject } from "../utils.ts";

const actor = getEnvVarOrThrow("GH_WORKFLOW_ACTOR");
const packageFile = getEnvVarOrThrow("PACKAGE_FILE");
const bumpKind = getEnvVarOrThrow("RELEASE_KIND") as ReleaseType;

const packageInfo = JSON.parse(await Deno.readTextFile(packageFile)) as {
  version: string;
  name: string;
};

const newVersion = format(increment(parse(packageInfo.version), bumpKind));

packageInfo.version = newVersion;

await Deno.writeTextFile(packageFile, JSON.stringify(packageInfo, null, "  "));

const rootPath = new Path(Deno.cwd());
const repo = new Repo(rootPath);

// setup git config
await repo.setGitConfig(actor);
const originalBranch = await repo.gitCurrentBranch();

// Create and push branch

const releaseBranchTitle = `chore/bot/update-${packageInfo.name}-version`;
const commitMessage = (await isMonorepoProject())
  ? `chore(${packageInfo.name}): update ${packageInfo.name} version to ${newVersion}`
  : `chore: update ${packageInfo.name} version to ${newVersion}`;

$.logStep(`Creating branch ${releaseBranchTitle} ...`);

await repo.gitBranch(releaseBranchTitle);
await repo.gitAdd();
await repo.gitCommit(commitMessage);

$.logStep("Pushing branch...");

await repo.gitPush("-u", "origin", "HEAD");

// Open PR
$.logStep("Opening PR...");

const octoKit = createOctoKit();
const openedPr = await octoKit.request("POST /repos/{owner}/{repo}/pulls", {
  ...getGitHubRepository(),
  base: originalBranch,
  head: releaseBranchTitle,
  draft: true,
  title: commitMessage,
});

$.log(`Opened PR at ${openedPr.data.html_url}`);
