"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
yargs_1.command({
    command: 'doctor',
    describe: 'Diagnose project',
    handler: function () {
        console.log('Diagnose project');
    },
});
