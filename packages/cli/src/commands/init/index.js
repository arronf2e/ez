"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
var create_ez_1 = require("@ez-fe/create-ez");
yargs_1.command({
    command: 'init',
    describe: 'Init a project with default templete',
    handler: create_ez_1.create,
});
