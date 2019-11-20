import { command } from 'yargs';
import { prompt } from 'inquirer';
import { getGeneratorList } from './generator';

command({
  command: 'init',
  describe: 'Init a project with default templete',
  handler: async () => {
    const answers = await prompt([
      {
        name: 'type',
        message: 'Select the boilerplate type',
        type: 'list',
        choices: await getGeneratorList(),
      },
    ]);

    console.log(answers);
  },
});
