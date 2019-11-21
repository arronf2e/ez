import 'module-alias/register';
import yargs from 'yargs';
import { em, checkVersion } from '@/helpers';

checkVersion();

yargs
  .usage(`Usage: ${em('$0 <command> [options]')}`)
  .commandDir('commands', { recurse: true })
  .alias({
    h: 'help',
    v: 'version',
  })
  .showHelpOnFail(true)
  .detectLocale(false)
  .epilog(`run ${em('ez [command] --help')} for usage of a specific command.`).argv;
