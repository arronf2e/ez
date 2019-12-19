import { Signale } from '@ez-fe/helper';
import { Msg } from './interface';

const logger = new Signale({
	interactive: true,
});

export function error(msg: Msg) {
	logger.start('Starting the development server...');
}
