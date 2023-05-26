# Deploy Frontend Application
Deploy the front application to a Kubernetes cluster using a Helm Chart

## Usage
### Inputs
| Key                 | Required| Default                    | Example                                                 |
| ------------------- | ------- | -------------------------- | ------------------------------------------------------- |
| values_file         | false   | ./deploy/values.local.yaml | ./deploy/values.local.yaml                              |
| release_name        | false   | `$(basename ${{ github.repository }})`           | frontend-app                                            |
| image_tag           | true    |                            | 1.0.0                                                   |
| host                | false   | deploy.apps.jet.work       | 10.0.0.1                                                |
| user                | false   | github-deployer            | root                                                    |
| port                | false   | 22                         | 22                                                      |
| private_key         | true    |                            | ${{ secrets.SSH_KEY }}                                  |
| namespace           | true    |                            | test                                                    |

### Outputs
`public_url` - The public URL for a frontend application deployed on a Kubernetes cluster

### Example
```yaml
- name: deploy frontend application
  uses: byzanteam/jet-actions/front-deploy@main
  with:
    image_tag: "1.0.0"
    private_key: ${{ secrets.SSH_KEY }}
    namespace: test
```

### Note:
* The private key should be encoded using Base64.
* `namespace` supports two values: `production` and `test`. 
  * The `production` namespace corresponds to the production environment. Such as the formal provision of external services.
  * The `test` namespace corresponds to the test environment. Such as pr preview, testing new features.

