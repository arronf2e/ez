import yargs from 'yargs';
import { em } from './utils';

yargs
  .usage(`Usage: ${em('$0 <command> [options]')}`)
  .commandDir('cmds', { recurse: true })
  .alias({
    h: 'help',
    v: 'version',
  })
  .showHelpOnFail(true)
  .detectLocale(false)
  .epilog(`run ${em('ez [command] --help')} for usage of a specific command.`)
  .argv;
