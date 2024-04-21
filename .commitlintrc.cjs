// commitlint.config.js | .commitlintrc.js
/** @type {import('cz-git').UserConfig} */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function* resolveScopes(dir) {
  if (fs.existsSync(dir)) {
    const entries = fs.readdirSync(dir);
    for (entry of entries) {
      if (entry.startsWith(".")) continue;
      if (fs.lstatSync(path.join(dir, entry)).isDirectory()) {
        yield entry;
      }
    }
  }
}

const root_path = execSync("git rev-parse --show-toplevel").toString().trim();

const actions = resolveScopes(path.resolve(root_path, "./"));

const scopes = [...actions, "root"];

module.exports = {
  prompt: {
    scopes,
  },
};
