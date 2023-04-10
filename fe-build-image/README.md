# FE Build Image
Build and push front-end image for deploy

## Usage

```yaml
- name: Build Image
  uses: byzanteam/jet-actions/fe-build-image@main
  with:
    registries: |-
      registry,namespace,username,password
      ghcr.io,byzanteam,${{ github.repository_owner }},${{ secrets.GITHUB_TOKEN }}
    context: .
    docker_file: ./deploy/Dockerfile
    build-args: |
      SOME_CUSTOM_BUILD_ARG=xxx
    package_file: package.json
```
## 注：定义 registries 变量时应以一下格式
```yaml
registries: |-
  registry,namespace,username,password
  ghcr.io,byzanteam,${{ github.repository_owner }},${{ secrets.GITHUB_TOKEN }}
```
