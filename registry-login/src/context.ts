import * as core from '@actions/core'

export interface Inputs {
  hostname: string
  ns: string
  username: string
  password: string
}

let inputs: Inputs | undefined

export function getInputs(): Inputs {
  if (inputs) return inputs

  const registryInfo = core.getInput('registry-info')
  const [hostname, ns, username, password] = registryInfo.split(',')

  inputs = {
    hostname,
    ns,
    username,
    password
  }

  if (!inputs.username || !inputs.password) {
    throw new Error('Username and password required')
  } else if (!inputs.hostname) {
    throw new Error('Registry hostname required')
  } else if (!inputs.ns) {
    throw new Error('Registry ns required')
  } else {
    return inputs
  }
}

export function setOutputs() {
  const {hostname, ns} = getInputs()
  core.setOutput('hostname', hostname)
  core.setOutput('namespace', ns)
}
