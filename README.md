```yaml
- name: Deploy it
  uses: byzanteam/jet-actions/deploy@master
  with:
    deploy-host: beta.jet.work
    deploy-user: jet
    deploy-to: /var/www
    private-key: ${{ secrets.DEPLOYMENT_KEY }}
```
