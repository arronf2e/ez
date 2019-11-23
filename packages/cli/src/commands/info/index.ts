import { command, env } from 'yargs';

command({
  command: ['info'],
  describe: 'Diagnostics env info',
  handler: () => {
    console.log(env().config());
    console.log('info');
  },
});
