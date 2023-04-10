```yaml
- name: Deploy it
  uses: byzanteam/jet-actions/compose-upgrade@main
  with:
    deploy_host: beta.jet.work
    deploy_user: jet
    deploy_to: /var/www
    private_key: ${{ secrets.DEPLOYMENT_KEY }}
    image_name: ""
    image_version: ""
```
