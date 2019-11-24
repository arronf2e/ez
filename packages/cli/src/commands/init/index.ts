import { command } from 'yargs';
import { prompt } from 'inquirer';
import { getGeneratorList } from './get-generator-list';
import { getGenerator } from './get-generator';

command({
  command: 'init',
  describe: 'Init a project with default templete',
  handler: async () => {
    const { boilerplateType } = await prompt([
      {
        name: 'boilerplateType',
        message: 'Select the boilerplate type',
        type: 'list',
        choices: await getGeneratorList(),
      },
    ]);
    const generator = await getGenerator(boilerplateType);
    generator.run();
  },
});
