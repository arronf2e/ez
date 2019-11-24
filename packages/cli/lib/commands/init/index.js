"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const inquirer_1 = require("inquirer");
const get_generator_list_1 = require("./get-generator-list");
const get_generator_1 = require("./get-generator");
yargs_1.command({
    command: 'init',
    describe: 'Init a project with default templete',
    handler: async () => {
        const { boilerplateType } = await inquirer_1.prompt([
            {
                name: 'boilerplateType',
                message: 'Select the boilerplate type',
                type: 'list',
                choices: await get_generator_list_1.getGeneratorList(),
            },
        ]);
        const generator = await get_generator_1.getGenerator(boilerplateType);
        generator.run();
    },
});
