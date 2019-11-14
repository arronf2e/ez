"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
yargs_1.command({
    command: 'update',
    describe: 'Update packages of ez',
    handler: () => {
        console.log('Update packages of ez');
    },
});
