import { command } from 'yargs';
import { dev } from '@ez-fe/dev';

command({
	command: 'dev',
	describe: 'Start a dev server for development',
	builder: ({ option }) => {
		return option('target', {
			alias: 't',
			default: 'development',
			describe: 'Target environment',
		});
	},
	handler: dev,
});
