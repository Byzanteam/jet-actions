import * as actionsToolkit from 'https://esm.sh/@docker/actions-toolkit';

import * as context from './context.ts';
import * as docker from './docker.ts';

const inputs: context.Inputs = context.getInputs();

async function post(): Promise<void> {
	await docker.logout(inputs.registryHostname);
}

actionsToolkit.run(post);
