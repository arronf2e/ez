"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
yargs_1.command({
    command: 'generate',
    describe: 'Generate code snippets quickly',
    aliases: 'g',
    handler: () => {
        console.log('Generate code snippets quickly');
    },
});
