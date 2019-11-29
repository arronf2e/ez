"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const dev_1 = require("@ez-fe/dev");
yargs_1.command({
    command: 'dev',
    describe: 'Start a dev server for development',
    handler: dev_1.dev,
});
