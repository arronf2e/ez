import { resolve } from 'path';
import { fork } from 'child_process';
import { Arguments } from 'yargs';
import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { start } from './start';
import { restarting } from './restarting';
import { success } from './success';
import { error } from './error';
import { Signals, Msg, ReStartingData, SuccessData, ErrorData } from './interface';

export async function dev(argv: Arguments) {
	const { target } = argv;

	const ez = new Ez({
		NODE_ENV: 'development',
		BUILD_ENV: target as BUILD_ENV,
	});

	const devServer = fork(resolve(__dirname, './dev-server'), [], { silent: true });

	devServer.on('message', async (msg: Msg) => {
		const { type, data } = msg;

		if (type === 'start') await start(ez, devServer);

		if (type === 'restarting') restarting(<ReStartingData>data);

		if (type === 'success') success(<SuccessData>data);

		if (type === 'error') error(<ErrorData>data);
	});

	['SIGINT', 'SIGTERM'].forEach(signal => {
		process.on(signal as Signals, () => {
			process.exit(0);
		});
	});
}
