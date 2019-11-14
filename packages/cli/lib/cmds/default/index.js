"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
yargs_1.command({
    command: ['$0'],
    describe: 'Default',
    handler: () => {
        console.log(yargs_1.parsed);
    },
}).recommendCommands();
