import 'module-alias/register';
import { resolve } from 'path';
import yargs from 'yargs';
import { message, em, error, checkNodeVersion, checkUpdate } from '@ez-fe/helper';

checkNodeVersion();

checkUpdate(resolve(__dirname, '..'));

yargs
  .scriptName('ez')
  .version()
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
  .recommendCommands()
  .fail((msg, err) => {
    if (err) throw err;
    message.error(msg);
  }).argv;
