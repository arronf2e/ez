import { Signale } from '@ez-fe/helper';
import { ReStartingData } from './interface';

const logger = new Signale({
	interactive: true,
});

export function restarting({ why }: ReStartingData) {
	logger.start('Starting the development server...');
}
