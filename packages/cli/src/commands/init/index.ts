import { command } from 'yargs';
import { prompt } from 'inquirer';
import { getGeneratorList } from './get-generator-list';
import { AppGenerator } from '@/generators/app';

command({
  command: 'init',
  describe: 'Init a project with default templete',
  handler: async () => {
    const answers = await prompt([
      {
        name: 'boilerplateType',
        message: 'Select the boilerplate type',
        type: 'list',
        choices: await getGeneratorList(),
      },
    ]);
    new AppGenerator(answers).prompt();
  },
});
