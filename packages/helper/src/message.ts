import { Signale } from 'signale';

const options = {
	disabled: false,
	interactive: false,
	stream: process.stdout,
	config: {
		displayTimestamp: false,
	},
};

const { success, info, warn, error, pending, complete, start } = new Signale(options);

export const message = {
	success: (msg: string) => success(msg),
	info: (msg: string) => info(msg),
	warning: (msg: string) => warn(msg),
	error: (msg: string) => error(msg),
	start: (msg: string) => start(msg),
	pending: (msg: string) => pending(msg),
	complete: (msg: string) => complete(msg),
};
