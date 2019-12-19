import { resolve } from 'path';
import { fork } from 'child_process';
import { Arguments } from 'yargs';
import { Signale } from '@ez-fe/helper';
import { Signals, Msg, StartingData } from './interface';

const logger = new Signale({
	interactive: true,
});

export async function dev(argv: Arguments) {
	// logger.await('Starting the development server...\n');
	const devServer = fork(resolve(__dirname, './dev-server'));

	devServer.on('message', (msg: Msg) => {
		const { type, data } = msg;

		if (type === 'starting') {
			const { step, name } = <StartingData>data;
			logger.pending(`[%d/3] - ${name}...`, step);
		}

		if (type === 'success') {
			const { name } = <StartingData>data;
			logger.success(name);
		}
	});

	['SIGINT', 'SIGTERM'].forEach(signal => {
		process.on(signal as Signals, () => {
			process.exit(0);
		});
	});
}
