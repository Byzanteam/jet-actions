# FE Build Image
Build and push front-end image for deploy

## Usage

```yaml
- name: Build Image
  uses: byzanteam/jet-actions/fe-build-image@main
  with:
    registries: |-
      registry,namespace,username,password
      ghcr.io,byzanteam,${{ github.repository_owner }},${{ github.token }}
    context: .
    dockerfile: ./deploy/Dockerfile
    build-args: |
      SOME_CUSTOM_BUILD_ARG=xxx
    cache_type: local
```
> **注**：定义 registries 变量时应该使用以下格式
```yaml
registries: |-
  registry,namespace,username,password
  ghcr.io,byzanteam,${{ github.repository_owner }},${{ github.token }}
```
> **注**: 当前支持的值 `local` 和 `gha`.
> 使用 self hosted 时，必须指定 cache_type 为 local;
> 使用 Github hosted 时可以不指定或指定 cache_type 为 gha
```yaml
cache_type: local
```
