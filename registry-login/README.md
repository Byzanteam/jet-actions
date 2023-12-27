## Usage
### Inputs

| Key                 | Required| Default                    | Example                                                 |
| ------------------- | ------- | -------------------------- | ------------------------------------------------------- |
| registry-info       | true    |                            | ${{ secrets.ALIYUN_SKYLARK_REGISTRY }}                  |

### Outputs
  `registry-hostname` - The image registry hostname.
  `registry-namespace` - The image registry namespace.

### Example
  ```yaml
- name: Login registry
  uses: byzanteam/jet-actions/registry-login@main
  with:
    ${{ secrets.ALIYUN_SKYLARK_REGISTRY }}
  ```

#### registries 参数格式
`$registry,$namespace,$username,$password`(以 `,` 分割)
