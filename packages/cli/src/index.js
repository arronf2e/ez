"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var path_1 = require("path");
var yargs_1 = __importDefault(require("yargs"));
var helper_1 = require("@ez-fe/helper");
helper_1.checkNodeVersion();
helper_1.checkUpdate(path_1.resolve(__dirname, '..'));
yargs_1.default
    .scriptName('ez')
    .version()
    .usage("Usage: " + helper_1.em('$0 <command> [options]'))
    .commandDir('commands', { recurse: true })
    .alias({
    h: 'help',
    v: 'version',
})
    .showHelpOnFail(true)
    .detectLocale(false)
    .epilog("run " + helper_1.em('ez [command] --help') + " for usage of a specific command.")
    .demandCommand(1, helper_1.error('You need at least one command!'))
    .recommendCommands()
    .fail(function (msg, err) {
    if (err)
        throw err;
    helper_1.message.error(msg);
}).argv;
