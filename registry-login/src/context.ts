import * as core from '@actions/core';

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

export function setOutputs() {
	const inputs: Inputs = getInputs();
	core.setOutput("registry-hostname", inputs.registryHostname);
	core.setOutput("registry-namespace", inputs.registryNamespace);
}
