"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
var dev_1 = require("@ez-fe/dev");
yargs_1.command({
    command: 'dev',
    describe: 'Start a dev server for development',
    handler: dev_1.dev,
});
