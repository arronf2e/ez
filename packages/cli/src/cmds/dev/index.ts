import { command } from 'yargs';

command({
  command: 'dev',
  describe: 'Start a dev server for development',
  handler: () => {
    console.log('Development');
  },
});
