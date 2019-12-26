import { resolve } from 'path';
import { fork } from 'child_process';
import { Arguments } from 'yargs';
import { Signals, Msg, Tip, Log, tip } from '@ez-fe/core';
import { logger } from '@ez-fe/helper';

export async function dev(argv: Arguments) {
	const { target } = argv;
	tip.start(`Initializing development configuration...`);

	const devServer = fork(resolve(__dirname, './dev-server'), [], {
		silent: false,
	});

	devServer.on('message', async ({ exec, data }: Msg) => {
		if (exec === 'tip') {
			const { type, content } = <Tip['data']>data;
			return tip[type](content);
		}

		if (exec === 'log') {
			const { type, content } = <Log['data']>data;
			return logger[type](content as any);
		}

		if (exec === 'restart') {
			const { type, content } = <Log['data']>data;

			console.clear();
			logger[type](content as any);

			setTimeout(() => {
				devServer.kill();
				dev(argv);
			}, 1000);
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
