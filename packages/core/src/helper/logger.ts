import { logger } from '@ez-fe/helper';

export function error(errors: string[]) {
	logger.error(`Failed to compile with ${errors.length} errors`);
	errors.forEach(error => {
		logger.error(error);
	});
}

export function done(costTime?: number) {
	logger.done(`Compiled successfully in ${costTime} ms`);
}

export function warning(warnings: string[]) {
	warnings.forEach(warning => {
		logger.warning(warning);
	});
}
