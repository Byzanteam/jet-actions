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
