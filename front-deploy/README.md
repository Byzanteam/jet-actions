## HowTo
```yaml
- name: front deploy
  uses: byzanteam/jet-actions/front-deploy@main
  with:
    values_file: ./deploy/values.local.yaml
    release_name: front-app
    image_tag: "1.0.0"
    host: ${{ secrets.SSH_HOST }}
    user: ${{ secrets.SSH_USER }}
    port: 22
    private_key: ${{ secrets.SSH_KEY }}
    repository_password: ${{ secrets.REPOSITORY_PASSWORD }}
```

添加 secret 参数到 repo 中，`Settings->Secrets and variables->Actions->Repository secrets`:
* SSH_KEY
> base64 encoding ~/.ssh/id_rsa

