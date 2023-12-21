#!/usr/bin/env -S deno run -A

import * as core from 'https://esm.sh/@actions/core';
import * as actionsToolkit from 'https://esm.sh/@docker/actions-toolkit';
import {Exec} from 'https://esm.sh/@docker/actions-toolkit/lib/exec';

export interface Inputs {
  registryHostname: string;
  registryNamespace: string;
  username: string;
  password: string;
}

export function getInputs(): Inputs {
  const registryInfo = core.getInput('registry-info');
  const [registryHostname, registryNamespace, username, password] = registryInfo.split(" ");

  return {
    registryHostname,
    registryNamespace,
    username,
    password
  };
}

export async function login(registry: string, username: string, password: string): Promise<void> {
	if (!username || !password) {
		throw new Error('Username and password required');
	}

	const loginArgs: Array<string> = ['login', '--password-stdin'];
	loginArgs.push('--username', username);
	loginArgs.push(registry);

	core.info(`Logging into ${registry}...`);
	await Exec.getExecOutput('docker', loginArgs, {
		ignoreReturnCode: true,
    silent: true,
    input: ((new TextDecoder()).decode(((new TextEncoder()).encode(password))))
	}).then(res => {
		if (res.stderr.length > 0 && res.exitCode != 0) {
			throw new Error(res.stderr.trim());
		}
		core.info(`Login Succeeded!`);
	});
}
const inputs: Inputs = getInputs();

export function setOutputs() {
	core.setOutput("registry-hostname", inputs.registryHostname);
	core.setOutput("registry-namespace", inputs.registryNamespace);
}

export async function main(): Promise<void> {
	setOutputs();
	await login(inputs.registryHostname, inputs.username, inputs.password);
}

actionsToolkit.run(main);

