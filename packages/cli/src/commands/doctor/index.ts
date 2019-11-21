import { command } from 'yargs';

command({
  command: 'doctor',
  describe: 'Diagnose project',
  handler: () => {
    console.log('Diagnose project');
  },
});
