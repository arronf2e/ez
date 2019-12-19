import { Signale } from '@ez-fe/helper';
import { SuccessData } from './interface';

const logger = new Signale({
	interactive: true,
});

export function success({}: SuccessData) {
	logger.start('Starting the development server...');
}
