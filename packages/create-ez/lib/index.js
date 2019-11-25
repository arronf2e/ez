"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const inquirer_1 = require("inquirer");
const path_1 = require("path");
const helper_1 = require("@ez-fe/helper");
const get_generator_list_1 = require("./get-generator-list");
const get_generator_1 = require("./get-generator");
const { cwd } = process;
async function create() {
    const { boilerplateType } = await inquirer_1.prompt([
        {
            name: 'name',
            type: 'input',
            default: path_1.basename(cwd()) || 'react-admin',
            validate: (input) => {
                if (/^[a-zA-Z0-9_-]{1,32}|\.$/.test(input))
                    return true;
                return helper_1.error('Invalid package name');
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
}
exports.create = create;
exports.default = create;
