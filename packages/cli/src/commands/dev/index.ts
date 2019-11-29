import { command } from 'yargs';
import { dev } from '@ez-fe/dev';

command({
  command: 'dev',
  describe: 'Start a dev server for development',
  handler: dev,
});
