import * as actionsToolkit from '@docker/actions-toolkit'

import * as context from './context'
import * as docker from './docker'

export async function main(): Promise<void> {
  const {hostname, username, password} = context.getInputs()
  await docker.login(hostname, username, password)
  context.setOutputs()
}

async function post(): Promise<void> {
  const {hostname} = context.getInputs()
  await docker.logout(hostname)
}

actionsToolkit.run(main, post)
