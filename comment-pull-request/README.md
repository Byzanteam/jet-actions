## Usage
### Inputs

| Key                 | Required| Default                    | Example                                                 |
| ------------------- | ------- | -------------------------- | ------------------------------------------------------- |
| message             | true    |                            |  "Some messages printed in pull request"                |
| github_token        | false   | ${{ github.token }}        |  ${{ github.token }}                                    |

### Example
```yaml
- name: Login registry
  uses: byzanteam/jet-actions/comment-pull-request@main
  with:
    message: "Some messages printed in pull request"
```

