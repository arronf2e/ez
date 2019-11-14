import yargs from 'yargs';
import { satisfies } from 'semver';
import { em, error } from './utils';

if (!satisfies(process.version, '>= 8.0.0')) {
  console.error(error('\n ✘ Only work with Node v8.0.0 and up!'));
  process.exit(1);
}

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
