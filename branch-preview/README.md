## Pack

Build the typescript and package it for distribution
```bash
$ npm run build && npm run pack
```

## Usage

```yaml
- name: Deploy to Netlify
  uses: byzanteam/jet-actions/branch-preview@master
  with:
    netlify-auth: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    netlify-dir: ./dist/
    netlify-site-name: ${{ steps.set-site-name.outputs.name }}
    netlify-account-slug: jet-preview
    github-token: ${{ secrets.GITHUB_TOKEN }}
```
