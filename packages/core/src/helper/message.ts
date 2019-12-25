import { Signale, SignaleMethods } from '@ez-fe/helper';

export type CompilerLogType =
	| 'address'
	| 'clear'
	| 'info'
	| 'success'
	| 'done'
	| 'warning'
	| 'error'
	| 'done'
	| 'notice';

export interface Log {
	exec: 'log';
	data: {
		type: CompilerLogType;
		content?: string | object;
	};
}

export interface Tip {
	exec: 'tip';
	data: {
		type: SignaleMethods;
		content: string;
	};
}

export type Signals = 'SIGINT' | 'SIGTERM';

export type Msg = Tip | Log;

export const tip: Signale = new Signale({
	interactive: true,
});

const send = (msg: Log | Tip) => {
	if (process && process.send) {
		process.send(msg);
	}
};

export function sendTip(data: Tip['data']) {
	send({
		exec: 'tip',
		data,
	});
}

export function sendLog(data: Log['data']) {
	send({
		exec: 'log',
		data,
	});
}
