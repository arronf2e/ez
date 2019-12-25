import { sendLog } from '../message';

export function done(costTime?: number) {
	sendLog({
		type: 'done',
		content: `Compiled successfully in ${costTime} ms`,
	});
}
