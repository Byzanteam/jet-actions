import * as actionsToolkit from 'https://esm.sh/@docker/actions-toolkit';

import * as context from './context.ts';
import * as docker from './docker.ts';

const inputs: context.Inputs = context.getInputs();

export async function main(): Promise<void> {
	context.setOutputs();
	await docker.login(inputs.registryHostname, inputs.username, inputs.password);
}

async function post(): Promise<void> {
	await docker.logout(inputs.registryHostname);
}

actionsToolkit.run(main, post);
