"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const inquirer_1 = require("inquirer");
const generator_1 = require("./generator");
yargs_1.command({
    command: 'init',
    describe: 'Init a project with default templete',
    handler: async () => {
        const answers = await inquirer_1.prompt([
            {
                name: 'type',
                message: 'Select the boilerplate type',
                type: 'list',
                choices: await generator_1.getGeneratorList(),
            },
        ]);
        console.log(answers);
    },
});
