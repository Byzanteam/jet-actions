# Pull request prview action

## Usage
### Inputs
| Key                 | Required| Default                     | Example                                                 |
| ------------------- | ------- | --------------------------- | ------------------------------------------------------- |
| ali_registry_info   | true    |                             | ${{ secrets.ALIYUN_SKYLARK_REGISTRY }}                  |
| values_file         | false   | ./.deploy/values.local.yaml | ./.deploy/values.local.yaml                             |
| image_tag_key_path  | false   | image.tag                   | image.tag                                               |
| host_key_path       | false   | applicationHosts            | applicationHosts                                        |
| chart_name          | false   | application-chart-template  | application-chart-template                              |
| k8s_apiserver       | false   | https://10.64.0.43:6443     | https://10.64.0.43:6443                                 |
| k8s_token           | true    |                             | ${{ secrets.K8S_TOKEN }}                                |

### Outputs
`public_url` - The public URL for a application deployed on a Kubernetes cluster
`release_name` - Helm release name of the deployment preview

### Example
```yaml
- name: pr preview
  uses: byzanteam/jet-actions/pr-preview@main
  with:
    ali_registry_info: ${{ secrets.ALIYUN_SKYLARK_REGISTRY }}
    k8s_token: ${{ secrets.K8S_TOKEN }}
```

