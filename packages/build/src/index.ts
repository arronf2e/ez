import { resolve } from 'path';
import { fork } from 'child_process';
import { Arguments } from 'yargs';
import { logger } from '@ez-fe/helper';
import { tip } from '@ez-fe/core';
import { Signals, Tip, Log, Msg } from './interface';

let buildProcess: any;

['SIGINT', 'SIGTERM'].forEach(signal => {
	process.on(signal as Signals, () => {
		if (buildProcess) {
			buildProcess.kill();
		}
		process.exit(0);
	});
});

export async function build(args: Arguments) {
	const { target } = args;
	tip.start(`Initializing production configuration...`);

	buildProcess = fork(resolve(__dirname, './build'), [], {
		silent: false,
	});

	buildProcess.on('message', async ({ exec, data }: Msg) => {
		if (exec === 'tip') {
			const { type, content } = <Tip['data']>data;
			return tip[type](content);
		}

		if (exec === 'log') {
			const { type, content } = <Log['data']>data;
			return logger[type](content);
		}
	});

	buildProcess.send({
		exec: 'start',
		target,
	});
}
