"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
yargs_1.command({
    command: 'dev',
    describe: 'Start a dev server for development',
    handler: () => {
        console.log('Development');
    },
});
