import { command } from 'yargs';
import { build } from '@ez-fe/build';

command({
	command: 'build',
	describe: 'Building for production',
	handler: build,
});
