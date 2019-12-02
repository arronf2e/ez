"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
yargs_1.command({
    command: 'update',
    describe: 'Update packages of ez',
    handler: function () {
        console.log('Update packages of ez');
    },
});
