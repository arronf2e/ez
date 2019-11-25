import 'module-alias/register';
import { prompt } from 'inquirer';
import { basename } from 'path';
import { error } from '@ez-fe/helper';
import { getGeneratorList } from './get-generator-list';
import { getGenerator } from './get-generator';

const { cwd } = process;

async function create() {
  const { boilerplateType } = await prompt([
    {
      name: 'name',
      type: 'input',
      default: basename(cwd()) || 'react-admin',
      validate: (input: string) => {
        if (/^[a-zA-Z0-9_-]{1,32}|\.$/.test(input)) return true;
        return error('Invalid package name');
      },
    },
    {
      name: 'description',
      type: 'input',
    },
    {
      name: 'boilerplateType',
      message: 'Select the boilerplate type',
      type: 'list',
      choices: await getGeneratorList(),
    },
  ]);

  const generator = await getGenerator(boilerplateType);
  generator.run();
}

export { create };

export default create;
