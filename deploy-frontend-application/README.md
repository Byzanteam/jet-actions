# Deploy Frontend Application
Deploy the front application to a Kubernetes cluster using a Helm Chart

## Usage
### Inputs
| Key                 | Required| Default                    | Example                                                 |
| ------------------- | ------- | -------------------------- | ------------------------------------------------------- |
| values_file         | false   | ./deploy/values.local.yaml | ./deploy/values.local.yaml                              |
| release_name        | false   | my-frontend-app            | frontend-app                                            |
| image_tag           | true    |                            | 1.0.0                                                   |
| host                | false   | deploy.apps.jet.work       | 10.0.0.1                                                |
| user                | false   | github-deployer            | root                                                    |
| port                | false   | 22                         | 22                                                      |
| private_key         | true    |                            | ${{ secrets.SSH_KEY }}                                  |
| namespace           | false   | test                       | test                                                    |

### Outputs
`domain_name` - Access domain name of the current application

### Example
```yaml
- name: deploy frontend application
  uses: byzanteam/jet-actions/front-deploy@main
  with:
    image_tag: 1.0.0
    private_key: ${{ secrets.SSH_KEY }}
```

### Note:
* The private key should be encoded using Base64.
* `namespace` supports two values: production and test
  * The production namespace corresponds to the production environment
  * The test namespace corresponds to the test environment
