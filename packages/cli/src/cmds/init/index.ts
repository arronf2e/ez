import { command } from 'yargs';

command({
  command: 'init',
  describe: 'Init a project with default templete',
  handler: () => {
    console.log('Init a project with default templete');
  },
});
