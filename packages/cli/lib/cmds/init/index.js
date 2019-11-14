"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
yargs_1.command({
    command: 'init',
    describe: 'Init a project with default templete',
    handler: () => {
        console.log('Init a project with default templete');
    },
});
