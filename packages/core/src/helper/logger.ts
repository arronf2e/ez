import { sendLog } from './message';

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

export function done(costTime?: number) {
	sendLog({
		type: 'done',
		content: `Compiled successfully in ${costTime} ms`,
	});
}

export function warning(warnings: string[]) {
	warnings.forEach(warning => {
		sendLog({
			type: 'warning',
			content: warning,
		});
	});
}
