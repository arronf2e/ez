import { command } from 'yargs';

command({
  command: 'update',
  describe: 'Update packages of ez',
  handler: () => {
    console.log('Update packages of ez');
  },
});
