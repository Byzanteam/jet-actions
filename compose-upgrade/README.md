```yaml
- name: Upgraded by compose
  uses: byzanteam/jet-actions/compose-upgrade@main
  with:
    host: beta.jet.work
    user: jet
    port: 22
    docker_compose_file_path: /var/www/docker-compose.yml
    private_key: ${{ secrets.DEPLOYMENT_KEY }}
    service_name: "jet-example"
    image: "registry.cn-hangzhou.aliyuncs.com/jet/jet-example:latest"
```
