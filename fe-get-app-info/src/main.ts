import * as core from '@actions/core'
import { readFileSync } from 'fs'
import { resolve } from 'path'

interface Package {
  name: string
  version: string
}

async function main() {
  const pkgPath = resolve(
    process.cwd(),
    core.getInput('package_file', { required: true })
  )

  try {
    const pkg = JSON.parse(
      readFileSync(pkgPath, { encoding: 'utf-8' })
    ) as Package

    core.setOutput('name', pkg.name)
    core.setOutput('version', pkg.version)
  } catch (error: unknown) {
    core.error(error as Error)

    core.setFailed((error as Error).message)
  }
}

main()
