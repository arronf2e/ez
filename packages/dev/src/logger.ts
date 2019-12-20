import { Signale } from '@ez-fe/helper';
import { Msg } from './interface';

export const logger: Signale = new Signale({
	interactive: true,
});

const send = (msg: Msg) => {
	if (process && process.send) {
		process.send(msg);
	}
};

export function sendLog(data: Msg['data']) {
	send({
		exec: 'log',
		data,
	});
}
