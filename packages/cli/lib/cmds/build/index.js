"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
yargs_1.command({
    command: 'build',
    describe: 'Building for production',
    handler: () => {
        console.log('Building for production');
    },
});
