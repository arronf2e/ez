import { Signale } from '@ez-fe/helper';
import { ErrorData } from './interface';

const logger = new Signale({
	interactive: true,
});

export function error({ error }: ErrorData) {
	logger.start('Starting the development server...');
}
