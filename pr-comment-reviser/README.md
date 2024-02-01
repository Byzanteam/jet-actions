# Pr comment reviser

## Description
- This action is used to add or update a pr comment

## Usage

### Inputs

| Key                 | Required| Default                    | Example                                                 |
| ------------------- | ------- | -------------------------- | ------------------------------------------------------- |
| body                | true    |                            |  "The comment body"                                     |
| github_token        | false   | ${{ github.token }}        |  ${{ github.token }}                                    |

### Example
```yaml
- name: pr comment operation
  uses: byzanteam/jet-actions/pr-comment-reviser@main
  with:
    body: "Some messages in pull request comment"
```

