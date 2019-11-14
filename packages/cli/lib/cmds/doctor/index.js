"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
yargs_1.command({
    command: 'doctor',
    describe: 'Diagnose project',
    handler: () => {
        console.log('Diagnose project');
    },
});
