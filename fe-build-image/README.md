# FE Build Image
Build and push front-end image for deploy

## Usage

```yaml
- name: Build Image
  uses: byzanteam/jet-actions/fe-build-image@main
  with:
    registries: |-
      ${{ secrets.ALIYUN_SKYLARK_REGISTRY }}
      ghcr.io,byzanteam,${{ github.repository_owner }},${{ github.token }}
    context: .
    dockerfile: ./deploy/Dockerfile
    build-args: |
      SOME_CUSTOM_BUILD_ARG=xxx
    cache_type: local
```
#### registries 参数格式
`$registry,$namespace,$username,$password`(以 `,` 分割)


每个 repo 提供两个 registry 相关的 [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) ：
1. `${{ secrets.ALIYUN_SKYLARK_REGISTRY }}`：`skylark` 相关的项目使用
2. `${{ secrets.ALIYUN_JET_REGISTRY }}`：`jet` 相关的项目使用

```yaml
registries: |-
  ghcr.io,byzanteam,${{ github.repository_owner }},${{ github.token }}
```
#### cache_type 可选值
1. 使用 self hosted 时，必须指定 `cache_type` 为 `local`
2. 使用 Github hosted 时可以不指定或指定 `cache_type` 为 `gha`
```yaml
cache_type: local
```

#### 迁移样例
https://github.com/Byzanteam/jet-autoflow-example/pull/2
