"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const build_1 = require("@ez-fe/build");
yargs_1.command({
    command: 'build',
    describe: 'Building for production',
    handler: build_1.build,
});
