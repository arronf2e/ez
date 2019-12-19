import { resolve } from 'path';
import { fork } from 'child_process';
import { Arguments } from 'yargs';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { start } from './start';
import { restarting } from './restarting';
import { success } from './success';
import { error } from './error';
import { Signals, Msg } from './interface';

export async function dev(argv: Arguments) {
	const { target } = argv;

	const devServer = fork(resolve(__dirname, './dev-server'), [], { silent: true });

	devServer.on('message', async (msg: Msg) => {
		const { type } = msg;

		if (type === 'start') await start(msg, target as BUILD_ENV, devServer);

		if (type === 'restarting') restarting(msg);

		if (type === 'success') success(msg);

		if (type === 'error') error(msg);
	});

	['SIGINT', 'SIGTERM'].forEach(signal => {
		process.on(signal as Signals, () => {
			process.exit(0);
		});
	});
}
