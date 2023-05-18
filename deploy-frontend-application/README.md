# Deploy Frontend Application
Deploy the front application to a Kubernetes cluster using a Helm Chart

## Values
| Key                 | Request | Default                    | Example                                                 |
| ------------------- | ------- | -------------------------- | ------------------------------------------------------- |
| values_file         | false   | ./deploy/values.local.yaml | values_file: ./deploy/values.local.yaml                 |
| release_name        | false    | ""                         | release_name: frontend-app                              |
| image_tag           | true    | ""                         | image_tag: 1.0.0                                      |
| host                | false   | deploy.apps.jet.work       | host: 10.0.0.1                                          |
| user                | false   | github-deployer            | user: root                                              |
| port                | false   | 22                         | port: 22                                                |
| private_key         | false    | ""                         | private_key: ${{ secrets.SSH_KEY }}                     |

## Usage
```yaml
- name: deploy frontend application
  uses: byzanteam/jet-actions/front-deploy@main
  with:
    values_file: ./deploy/values.local.yaml
    release_name: frontend-app
    image_tag: 1.0.0
    host: ${{ secrets.SSH_HOST }}
    user: ${{ secrets.SSH_USER }}
    port: 22
    private_key: ${{ secrets.SSH_KEY }}
```

### Note:
* The private key should be encoded using Base64.

