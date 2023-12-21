import * as actionsToolkit from "@docker/actions-toolkit";

import * as context from "./context";
import * as docker from "./docker";

const inputs: context.Inputs = context.getInputs();

export async function main(): Promise<void> {
  context.setOutputs();
  await docker.login(inputs.registryHostname, inputs.username, inputs.password);
}

actionsToolkit.run(main);
