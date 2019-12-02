"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
var build_1 = require("@ez-fe/build");
yargs_1.command({
    command: 'build',
    describe: 'Building for production',
    handler: build_1.build,
});
