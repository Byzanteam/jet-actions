import * as core from '@actions/core'

export interface Inputs {
  registryHostname: string
  registryNamespace: string
  username: string
  password: string
}

let inputs: Inputs | undefined

export function getInputs(): Inputs {
  if (inputs) return inputs

  const registryInfo = core.getInput('registry-info')
  const [registryHostname, registryNamespace, username, password] =
    registryInfo.split(' ')

  inputs = {
    registryHostname,
    registryNamespace,
    username,
    password
  }

  if (!inputs.username || !inputs.password) {
    throw new Error('Username and password required')
  } else if (!inputs.registryHostname) {
    throw new Error('Registry hostname required')
  } else if (!inputs.registryNamespace) {
    throw new Error('Registry namespace required')
  } else {
    return inputs
  }
}

export function setOutputs() {
  const inputs: Inputs = getInputs()
  core.setOutput('registry-hostname', inputs.registryHostname)
  core.setOutput('registry-namespace', inputs.registryNamespace)
}
