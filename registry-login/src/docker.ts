import * as core from '@actions/core';
import {Exec} from '@docker/actions-toolkit/lib/exec';

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
    input: Buffer.from(password)
	}).then(res => {
		if (res.stderr.length > 0 && res.exitCode != 0) {
			throw new Error(res.stderr.trim());
		}
		core.info(`Login Succeeded!`);
	});
}

export async function logout(registry: string): Promise<void> {
  await Exec.getExecOutput('docker', ['logout', registry], {
    ignoreReturnCode: true
  }).then(res => {
    if (res.stderr.length > 0 && res.exitCode != 0) {
      core.warning(res.stderr.trim());
    }
  });
}
