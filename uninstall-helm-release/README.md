# Uninstall helm release
## Description:
- This action is used to uninstall the helm release

## Usage
### Inputs
| Key                 | Required| Default                     | Example                                                 |
| ------------------- | ------- | --------------------------- | ------------------------------------------------------- |
| release_name        | false   |                             | application-release-name                                |
| k8s_apiserver       | false   | https://10.64.0.43:6443     | https://10.64.0.43:6443                                 |
| k8s_token           | true    |                             | ${{ secrets.K8S_TOKEN }}                                |

### Example
```yaml
- name: pr preview
  uses: byzanteam/jet-actions/uninstall-helm-release@main
  with:
    k8s_token: ${{ secrets.K8S_TOKEN }}
```

### Note

- Release on the apps.jet.work server is uninstalled by default
