import { CommandBuilder, Path } from "@david/dax";

export class Repo {
  constructor(readonly rootDir: Path) {
    if (!this.rootDir.exists()) {
      throw new Error(`Directory ${this.rootDir} does not exist`);
    }
  }

  get name() {
    return this.rootDir.basename();
  }

  async setGitConfig(actor: string) {
    await this.command([
      "git",
      "config",
      "user.email",
      `${actor}@users.noreply.github.com`,
    ]);

    await this.command([
      "git",
      "config",
      "user.name",
      actor,
    ]);
  }

  gitCurrentBranch() {
    return this.command("git rev-parse --abbrev-ref HEAD")
      .text();
  }

  async gitBranch(name: string) {
    await this.command(["git", "checkout", "-b", name]);
  }

  async gitAdd() {
    await this.command(["git", "add", "."]);
  }

  async gitCommit(message: string) {
    await this.command(["git", "commit", "-m", message]);
  }

  async gitPush(...additionalArgs: string[]) {
    await this.command(["git", "push", ...additionalArgs]);
  }

  command(command: string | string[]) {
    return new CommandBuilder()
      .command(command)
      .cwd(this.rootDir);
  }
}
