import { Signale } from '@ez-fe/helper';
import { Tip, Log } from './interface';

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
