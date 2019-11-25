import { command } from 'yargs';
import { create } from '@ez-fe/create-ez';

command({
  command: 'init',
  describe: 'Init a project with default templete',
  handler: create,
});
