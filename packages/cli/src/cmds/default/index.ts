import { command, parsed } from 'yargs';

command({
  command: ['$0'],
  describe: 'Default',
  handler: () => {
    console.log(parsed);
  },
}).recommendCommands();
