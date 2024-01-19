## Usage
### Inputs

| Key                 | Required| Default                    | Example                                                 |
| ------------------- | ------- | -------------------------- | ------------------------------------------------------- |
| body                | true    |                            |  "The comment body"                                     |
| github_token        | false   | ${{ github.token }}        |  ${{ github.token }}                                    |

### Example
```yaml
- name: Login registry
  uses: byzanteam/jet-actions/comment-pull-request@main
  with:
    body: "Some messages printed in pull request"
```

