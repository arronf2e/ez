import { sendLog } from '../message';

export function error(errors: string[]) {
	sendLog({
		type: 'error',
		content: `Failed to compile with ${errors.length} errors`,
	});
	errors.forEach(error => {
		sendLog({
			type: 'error',
			content: error,
		});
	});
}
