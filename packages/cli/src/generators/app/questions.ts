import { basename } from 'path';
import { error } from '@/helpers';

const { cwd } = process;

export const questions = [
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
    name: 'typescript',
    type: 'confirm',
    message: 'Do you want to use typescript?',
    default: true,
  },
  {
    name: 'features',
    message: 'What functionality do you want to enable?',
    type: 'checkbox',
    choices: [
      { name: 'antd', value: 'antd' },
      { name: 'code splitting', value: 'dynamicImport' },
      { name: 'dll', value: 'dll' },
    ],
  },
];
