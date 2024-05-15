# Upgrade FE application version

create PR update application version

## Usage

Modify the settings(`settings -> action -> general -> Workflow permissions`) so that action has permissions

```yaml
- name: Update Version
  uses: byzanteam/jet-actions/fe-version-upgrade@main
  with:
    version: 1.0.0
    package_file: package.json
```
