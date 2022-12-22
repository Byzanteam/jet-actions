# FE Build Image
Build and push front-end image for deploy

## Usage

```yaml
- name: Build Image
  uses: byzanteam/jet-actions/fe-build-image@main
  with:
    context: .
    github_token: ${{ secrets.GITHUB_TOKEN }}
    docker_file: ./deploy/Dockerfile
    build-args: |
      SOME_CUSTOM_BUILD_ARG=xxx
    package_file: package.json
```
