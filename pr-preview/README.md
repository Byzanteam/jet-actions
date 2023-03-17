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
![image](https://user-images.githubusercontent.com/48484963/225221175-b97e57ed-1915-4f0d-afdd-9bd499aa0739.png)

## HowTo
```yaml
- name: pr preview
  uses: byzanteam/jet-actions/pr-preview@main
  with:
    dockerfile: ./deploy/Dockerfile
    package_file: package.json
    kubectl_version: "1.25.7"
    deploy_file: ./frontApp.yaml
    host: IP_Address
    user: Username
    port: 22
    kube_conf: ${{ secrets.KUBE_CONF }}
    path: test
    ssh_key: ${{ secrets.SSH_KEY }}
```

添加 secret 参数到 repo 中，`Settings->Secrets and variables->Actions->Repository secrets`:
* SSH_KEY
* KUBE_CONF 
> base64 encoding ~/.kube/config
> base64 encoding ~/.ssh/id_rsa
