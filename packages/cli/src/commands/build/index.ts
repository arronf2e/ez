import { command } from 'yargs';

command({
  command: 'build',
  describe: 'Building for production',
  handler: () => {
    console.log('Building for production');
  },
});
