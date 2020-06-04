```yaml
- name: Deploy it
  uses: byzanteam/jet-actions/deploy@master
  with:
    deploy-host: beta.jet.work
    deploy-user: jet
    deploy-to: /var/www
    private-key: ${{ secrets.DEPLOYMENT_KEY }}
```

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
