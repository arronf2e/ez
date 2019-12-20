import { resolve } from 'path';
import { fork } from 'child_process';
import { Arguments } from 'yargs';
import { logger } from './logger';
import { Signals, Msg } from './interface';

export async function dev(argv: Arguments) {
	const { target } = argv;
	logger.start(`Initializing development configuration...`);

	const devServer = fork(resolve(__dirname, './dev-server'), [], {
		silent: true,
	});

	devServer.on('message', async ({ exec, data }: Msg) => {
		if (exec === 'log') {
			const { type, content } = data;
			logger[type](content);
		}
	});

	['SIGINT', 'SIGTERM'].forEach(signal => {
		process.on(signal as Signals, () => {
			devServer.kill();
			process.exit(0);
		});
	});

	devServer.send({
		exec: 'start',
		target,
	});
}
