import { command } from 'yargs';
import { prompt } from 'inquirer';
import { getGenerators } from './generator';

command({
  command: 'init',
  describe: 'Init a project with default templete',
  handler: async () => {
    const answers = await prompt([
      {
        name: 'type',
        message: 'Select the boilerplate type',
        type: 'list',
        choices: getGenerators(),
      },
    ]);

    console.log(answers);
  },
});
