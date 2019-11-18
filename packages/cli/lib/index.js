"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helper_1 = require("./helper");
helper_1.checkVersion();
yargs_1.default
    .usage(`Usage: ${helper_1.em('$0 <command> [options]')}`)
    .commandDir('cmds', { recurse: true })
    .alias({
    h: 'help',
    v: 'version',
})
    .showHelpOnFail(true)
    .detectLocale(false)
    .epilog(`run ${helper_1.em('ez [command] --help')} for usage of a specific command.`)
    .argv;
