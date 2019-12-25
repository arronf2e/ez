import { sendLog } from '../message';

export function warning(warnings: string[]) {
	warnings.forEach(warning => {
		sendLog({
			type: 'warning',
			content: warning,
		});
	});
}
