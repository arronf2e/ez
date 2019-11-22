import 'module-alias/register';
import yargs from 'yargs';
import { em, checkVersion, error, message } from '@/helpers';

checkVersion();

yargs
  .scriptName('ez')
  .strict()
  .usage(`Usage: ${em('$0 <command> [options]')}`)
  .commandDir('commands', { recurse: true })
  .alias({
    h: 'help',
    v: 'version',
  })
  .showHelpOnFail(true)
  .detectLocale(false)
  .epilog(`run ${em('ez [command] --help')} for usage of a specific command.`)
  .demandCommand(1, error('You need at least one command!'))
  .fail((msg, err) => {
    if (err) throw err;
    message.error(msg);
    message.info(`Specify ${em('--help')} for available commands.`);
  }).argv;
