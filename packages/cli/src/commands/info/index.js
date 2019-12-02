"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
yargs_1.command({
    command: ['info'],
    describe: 'Diagnostics env info',
    handler: function () {
        console.log(yargs_1.env().config());
        console.log('info');
    },
});
