```yaml
- name: Deploy it
  uses: byzanteam/jet-actions/deploy@main
  with:
    deploy-host: beta.jet.work
    deploy-user: jet
    deploy-to: /var/www
    private-key: ${{ secrets.DEPLOYMENT_KEY }}
    image_name: ""
    image_version: ""
```
