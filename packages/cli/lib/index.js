"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("@/helpers");
helpers_1.checkNodeVersion();
yargs_1.default
    .scriptName('ez')
    .strict()
    .usage(`Usage: ${helpers_1.em('$0 <command> [options]')}`)
    .commandDir('commands', { recurse: true })
    .alias({
    h: 'help',
    v: 'version',
})
    .showHelpOnFail(true)
    .detectLocale(false)
    .epilog(`run ${helpers_1.em('ez [command] --help')} for usage of a specific command.`)
    .demandCommand(1, helpers_1.error('You need at least one command!'))
    .fail((msg, err) => {
    if (err)
        throw err;
    helpers_1.message.error(msg);
    helpers_1.message.info(`Specify ${helpers_1.em('--help')} for available commands.`);
}).argv;