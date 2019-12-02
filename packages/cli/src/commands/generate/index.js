"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
yargs_1.command({
    command: 'generate',
    describe: 'Generate code snippets quickly',
    aliases: 'g',
    handler: function () {
        console.log('Generate code snippets quickly');
    },
});
