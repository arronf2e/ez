import { command } from 'yargs';

command({
  command: 'generate',
  describe: 'Generate code snippets quickly',
  aliases: 'g',
  handler: () => {
    console.log('Generate code snippets quickly');
  },
});
