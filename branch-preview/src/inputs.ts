import * as core from '@actions/core'

// Why use function rather than raw string? => Inputs should be lazy evaluated.
export interface Inputs {
  netlifyAuth(): string
  netlifyDir(): string
  netlifySiteName(): string
  githubToken(): string
}

export const defaultInputs: Inputs = {
  netlifyAuth() {
    return core.getInput('netlify-auth', {required: true})
  },
  netlifyDir() {
    return core.getInput('netlify-dir', {required: true})
  },
  netlifySiteName() {
    return core.getInput('netlify-site-name', {required: true})
  },
  githubToken() {
    return core.getInput('github-token', {required: true})
  }
}
