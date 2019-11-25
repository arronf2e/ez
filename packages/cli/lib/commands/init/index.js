"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const inquirer_1 = require("inquirer");
const path_1 = require("path");
const helpers_1 = require("@/helpers");
const get_generator_list_1 = require("./get-generator-list");
const get_generator_1 = require("./get-generator");
const { cwd } = process;
yargs_1.command({
    command: 'init',
    describe: 'Init a project with default templete',
    handler: async () => {
        const { boilerplateType } = await inquirer_1.prompt([
            {
                name: 'name',
                type: 'input',
                default: path_1.basename(cwd()) || 'react-admin',
                validate: (input) => {
                    if (/^[a-zA-Z0-9_-]{1,32}|\.$/.test(input))
                        return true;
                    return helpers_1.error('Invalid package name');
                },
            },
            {
                name: 'description',
                type: 'input',
            },
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
