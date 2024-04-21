import { format, increment, parse, ReleaseType, SemVer } from "@std/semver";
import { default as $, Path } from "@david/dax";

import { Repo } from "../../fundamental/repo.ts";

const VERSION_REGEX = /version: "([0-9]+\.[0-9]+\.[0-9]+)"/gm;

export class MixProject {
  constructor(readonly repo: Repo) {}

  get mixExsPath(): Path {
    const repoRootDir = this.repo.rootDir;
    return repoRootDir.join("mix.exs");
  }

  async getVersion(): Promise<SemVer> {
    const text = await this.mixExsPath.readText();

    const version = VERSION_REGEX.exec(text)?.[1];

    if (version == null) {
      throw new Error(`Could not find version in ${this.mixExsPath}`);
    }

    return parse(version);
  }

  async increment(part: ReleaseType) {
    const currentVersion = await this.getVersion();
    const newVersion = increment(currentVersion, part);
    return this.setVersion(newVersion);
  }

  async setVersion(version: SemVer) {
    $.logStep(`Setting ${this.repo.name} to ${format(version)}...`);

    const text = await this.mixExsPath.readText();
    const newText = text.replace(
      VERSION_REGEX,
      `version: "${format(version)}"`,
    );

    await this.mixExsPath.writeText(newText);
  }
}
