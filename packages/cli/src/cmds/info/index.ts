import { command } from 'yargs';

command({
  command: ['info'],
  describe: 'Diagnostics env info',
  handler: () => {
    console.log('info');
  },
});
