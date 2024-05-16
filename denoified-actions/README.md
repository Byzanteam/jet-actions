# Denoified Actions

## Elixir

### Bump mix project version

**inputs**

| Name           | Description                                       | Required |
| -------------- | ------------------------------------------------- | -------- |
| gh-token       | The GitHub token                                  | true     |
| workflow-actor | The GitHub username of the actor                  | true     |
| repository     | The GitHub repository in the format "owner/repo"  | true     |
| release-kind   | The kind of release to make (patch, minor, major) | true     |

```yaml
- uses: Byzanteam/jet-actions/denoified-actions/elixir/bump_version@main
  with:
    gh-token: ${{ secrets.GITHUB_TOKEN }}
    workflow-actor: ${{ github.actor }}
    repository: ${{ github.repository }}
    release-kind: ${{ inputs.releaseKind }}
```

**example**

```yaml
name: Version bump

on:
  workflow_dispatch:
    inputs:
      releaseKind:
        description: 'Kind of version bump'
        default: 'patch'
        type: choice
        options:
          - patch
          - minor
          - major
        required: true

jobs:
  bump:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: Byzanteam/jet-actions/denoified-actions/elixir/bump_version@main
        with:
          gh-token: ${{ secrets.GITHUB_TOKEN }}
          workflow-actor: ${{ github.actor }}
          repository: ${{ github.repository }}
          release-kind: ${{ inputs.releaseKind }}
```

## Javascript

### App bump new version

**inputs**

| Name           | Description                                       | Required |
| -------------- | ------------------------------------------------- | -------- |
| gh-token       | The GitHub token                                  | true     |
| workflow-actor | The GitHub username of the actor                  | true     |
| repository     | The GitHub repository in the format "owner/repo"  | true     |
| release-kind   | The kind of release to make (patch, minor, major) | true     |
| package-file   | The package.json file path (default package.json) | false    |

```yaml
- uses: Byzanteam/jet-actions/denoified-actions/javascript/bump_version@main
  with:
    gh-token: ${{ secrets.GITHUB_TOKEN }}
    workflow-actor: ${{ github.actor }}
    release-kind: ${{ inputs.releaseKind }}
    repository: ${{ github.repository }}
    package-file: ${{ inputs.packageFile }}
```

**example**

```yaml
name: Version bump

on:
  workflow_dispatch:
    inputs:
      releaseKind:
        description: 'Kind of version bump'
        default: 'patch'
        type: choice
        options:
          - patch
          - minor
          - major
        required: true

jobs:
  bump:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: Byzanteam/jet-actions/denoified-actions/javascript/bump_version@main
        with:
          gh-token: ${{ secrets.GITHUB_TOKEN }}
          workflow-actor: ${{ github.actor }}
          repository: ${{ github.repository }}
          release-kind: ${{ inputs.releaseKind }}
```
