"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
yargs_1.command({
    command: ['info'],
    describe: 'Diagnostics env info',
    handler: () => {
        console.log(yargs_1.env().config());
        console.log('info');
    },
});
