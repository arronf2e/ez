"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const inquirer_1 = require("inquirer");
const helper_1 = require("@ez-fe/helper");
const get_generator_list_1 = require("./get-generator-list");
const get_generator_1 = require("./get-generator");
async function create() {
    const baseInfo = await inquirer_1.prompt([
        {
            name: 'name',
            type: 'input',
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
            name: 'author',
            type: 'input',
        },
        {
            name: 'boilerplateType',
            message: 'Select the boilerplate type',
            type: 'list',
            choices: await get_generator_list_1.getGeneratorList(),
        },
    ]);
    const generator = await get_generator_1.getGenerator(baseInfo);
    generator.run();
}
exports.create = create;
exports.default = create;
