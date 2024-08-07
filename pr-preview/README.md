# Pull request prview action
## Description:
- This action builds the pull request code as an image and is deployed to the `apps.jet.work` server by default

## Usage
### Inputs
| Key                 | Required| Default                     | Example                                                 |
| ------------------- | ------- | --------------------------- | ------------------------------------------------------- |
| registry_info   | true    |                             | ${{ secrets.ALIYUN_SKYLARK_REGISTRY }}                      |
| values_file         | false   | ./.deploy/values.local.yaml | ./.deploy/values.local.yaml                             |
| image_tag_key_path  | false   | image.tag                   | image.tag                                               |
| host_key_path       | false   | applicationHosts            | applicationHosts                                        |
| chart          | false   | app-template/application-chart-template  | app-template/application-chart-template         |
| k8s_apiserver       | false   | https://10.64.0.43:6443     | https://10.64.0.43:6443                                 |
| k8s_token           | true    |                             | ${{ secrets.K8S_TOKEN }}                                |

### Outputs
`public_url` - The public URL for a application deployed on a Kubernetes cluster

### Example
```yaml
- name: pr preview
  uses: byzanteam/jet-actions/pr-preview@main
  with:
    ali_registry_info: ${{ secrets.ALIYUN_SKYLARK_REGISTRY }}
    k8s_token: ${{ secrets.K8S_TOKEN }}
```

### Note

- `registry_info` 参数格式

```yaml
# 以 ',' 分割
$registry,$namespace,$username,$password
```

- `chart` 参数格式

参考: https://helm.sh/docs/helm/helm_install/#:~:text=com/charts/nginx-,CHART%20REFERENCES,-A%20chart%20reference

- 访问地址格式 `$pr_number.$repo_name.apps.jet.work`
