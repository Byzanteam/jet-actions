# preview-pullrequest
前端 pr 预览 

```sequence
Developer->>Actions: 创建 Pull Request, 触发事件
Actions->>Application: 打包 Package, 部署应用
Actions->>Traefik: 配置 Reverse Proxy
Developer->>Traefik: 发送请求
Traefik->>Application: 转发请求
Application->>Traefik: 响应请求
Traefik->>Developer: 显示视图
```
## HowTo
```yaml
- name: pr preview
  uses: byzanteam/jet-actions/pr-preview@main
  with:
    context: .
    dockerfile: ./deploy/Dockerfile
    build-args: |
      SOME_CUSTOM_BUILD_ARG=xxx
    package_file: package.json
    kubectl_version: "1.25.7"
    deploy_file: ./frontApp.yaml
```

添加 secret 参数到 repo 中，`Settings->Secrets and variables->Actions->Repository secrets`:
* REGISTRY_TOKEN
* KUBE_CONF 
> base64 encoding ~/.kube/config
